pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    GITOPS_PAT      = 'gitops-pat'

    // Docker image
    DOCKER_REPO = 'muhammedsafry/fleet-frontend'

    // GitOps repo
    GITOPS_BRANCH = 'main'
    GITOPS_REPO_HTTPS = 'https://github.com/msafryx/fleet-gitops.git'
    VALUES_FILE = 'frontend/values-staging.yaml'

    // Non-secret build-time config (from your setup guide)
    KEYCLOAK_ID     = 'fleet-management-frontend'
    KEYCLOAK_ISSUER = 'http://localhost:8080/realms/fleet-management-app'
    NEXTAUTH_URL    = 'http://localhost:3000'

    NEXT_PUBLIC_VEHICLE_SERVICE_URL      = 'http://localhost:7001'
    NEXT_PUBLIC_DRIVER_SERVICE_URL       = 'http://localhost:6001'
    NEXT_PUBLIC_MAINTENANCE_SERVICE_URL  = 'http://localhost:5001'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Create Image Tag') {
      steps {
        script {
          def sha = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.IMAGE_TAG = "${env.BUILD_NUMBER}-${sha}"
          echo "IMAGE_TAG=${env.IMAGE_TAG}"
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        withCredentials([
          string(credentialsId: 'KEYCLOAK_SECRET', variable: 'KEYCLOAK_SECRET'),
          string(credentialsId: 'NEXTAUTH_SECRET', variable: 'NEXTAUTH_SECRET')
        ]) {
          sh """
            docker build \\
              --build-arg KEYCLOAK_ID=${KEYCLOAK_ID} \\
              --build-arg KEYCLOAK_SECRET=${KEYCLOAK_SECRET} \\
              --build-arg KEYCLOAK_ISSUER=${KEYCLOAK_ISSUER} \\
              --build-arg NEXTAUTH_URL=${NEXTAUTH_URL} \\
              --build-arg NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \\
              --build-arg NEXT_PUBLIC_VEHICLE_SERVICE_URL=${NEXT_PUBLIC_VEHICLE_SERVICE_URL} \\
              --build-arg NEXT_PUBLIC_DRIVER_SERVICE_URL=${NEXT_PUBLIC_DRIVER_SERVICE_URL} \\
              --build-arg NEXT_PUBLIC_MAINTENANCE_SERVICE_URL=${NEXT_PUBLIC_MAINTENANCE_SERVICE_URL} \\
              -t ${DOCKER_REPO}:${IMAGE_TAG} .
          """
        }
      }
    }

    stage('Trivy Scan (HIGH/CRITICAL)') {
      steps {
        sh "trivy image --severity HIGH,CRITICAL --no-progress ${DOCKER_REPO}:${IMAGE_TAG}"
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push ${DOCKER_REPO}:${IMAGE_TAG}
          '''
        }
      }
    }

    stage('Update GitOps (Helm values only)') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${GITOPS_PAT}", usernameVariable: 'GH_USER', passwordVariable: 'GH_TOKEN')]) {
          sh """
            rm -rf fleet-gitops
            git clone https://${GH_USER}:${GH_TOKEN}@github.com/msafryx/fleet-gitops.git fleet-gitops
            cd fleet-gitops
            git checkout ${GITOPS_BRANCH}

            export IMAGE_TAG='${IMAGE_TAG}'
            yq -i '.image.tag = strenv(IMAGE_TAG)' ${VALUES_FILE}

            git add ${VALUES_FILE}
            git commit -m "chore(staging): bump frontend image tag to ${IMAGE_TAG}" || echo "No changes"
            git push origin ${GITOPS_BRANCH}
          """
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}
