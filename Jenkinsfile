pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    GITOPS_PAT      = 'gitops-pat'

    // Docker image
    DOCKER_REPO = 'muhammedsafry/fleet-frontend'

    // GitOps repo
    GITOPS_BRANCH     = 'main'
    GITOPS_REPO_HTTPS = 'https://github.com/msafryx/fleet-gitops.git'
    VALUES_FILE       = 'frontend/values-staging.yaml'
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
        sh """
          docker build \
            -t ${DOCKER_REPO}:${IMAGE_TAG} .
        """
      }
    }

    //  Scan only (does not fail / no HIGH/CRITICAL gating)
    stage('Trivy Scan (Report Only)') {
      steps {
        // vuln scan only (faster), and do not fail pipeline
        sh """
          trivy image --no-progress --scanners vuln ${DOCKER_REPO}:${IMAGE_TAG} || true
        """
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

    //  Fixed GitOps update without putting token inside URL
    stage('Update GitOps (Helm values only)') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${GITOPS_PAT}", usernameVariable: 'GH_USER', passwordVariable: 'GH_TOKEN')]) {
          sh '''
            set -e

            rm -rf fleet-gitops

            # Create a temporary askpass script so git can get the token safely
            cat > /tmp/git-askpass.sh <<'EOF'
#!/bin/sh
echo "$GH_TOKEN"
EOF
            chmod +x /tmp/git-askpass.sh

            export GIT_ASKPASS=/tmp/git-askpass.sh
            export GIT_TERMINAL_PROMPT=0

            # Clone GitOps repo (no token in URL)
            git clone https://github.com/msafryx/fleet-gitops.git fleet-gitops

            cd fleet-gitops
            git checkout main

            export IMAGE_TAG="${IMAGE_TAG}"
            yq -i '.image.tag = strenv(IMAGE_TAG)' frontend/values-staging.yaml

            git add frontend/values-staging.yaml
            git commit -m "chore(staging): bump frontend image tag to ${IMAGE_TAG}" || echo "No changes"

            git push origin main

            rm -f /tmp/git-askpass.sh
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
