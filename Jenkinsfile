pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    GITOPS_PAT      = 'gitops-pat'

    DOCKER_REPO     = 'muhammedsafry/fleet-frontend'

    // If your GitOps repo is in a different org/user, change ONLY this line:
    GITOPS_REPO_HTTPS = 'https://github.com/msafryx/fleet-gitops.git'
    GITOPS_BRANCH     = 'main'

    VALUES_FILE     = 'frontend/values-staging.yaml'
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
        sh "docker build -t ${DOCKER_REPO}:${IMAGE_TAG} ."
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
          sh '''
            rm -rf fleet-gitops
            git clone https://$GH_USER:$GH_TOKEN@github.com/msafryx/fleet-gitops.git fleet-gitops
            cd fleet-gitops
            git checkout ${GITOPS_BRANCH}

            export IMAGE_TAG="${IMAGE_TAG}"
            yq -i '.image.tag = strenv(IMAGE_TAG)' ${VALUES_FILE}

            git add ${VALUES_FILE}
            git commit -m "chore(staging): bump frontend image tag to ${IMAGE_TAG}" || echo "No changes"
            git push origin ${GITOPS_BRANCH}
          '''
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
