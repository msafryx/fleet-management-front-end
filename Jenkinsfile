pipeline {
  agent any

  environment {
    DOCKER_IMAGE  = "muhammedsafry/fleet-management-front-end"
    GITOPS_REPO   = "https://github.com/msafryx/fleet-gitops.git"

    // Your current GitOps values file
    GITOPS_VALUES = "frontend/chart/values-staging.yaml"
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/msafryx/fleet-management-front-end.git'
      }
    }

    stage('Build & Test') {
      steps {
        sh '''
          set -e
          echo "Install deps + build"
          cd fleet-management-app
          npm ci
          npm run build
        '''
      }
    }

    stage('Trivy (Filesystem Scan)') {
      steps {
        sh '''
          echo "Trivy fs scan (non-blocking)"
          # scans the whole repo workspace (including fleet-management-app)
          trivy fs --no-progress \
            --scanners vuln,secret,config \
            --severity HIGH,CRITICAL \
            . || true
        '''
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          set -e
          echo "Building Docker image"
          # Dockerfile is at repo root, but app is inside fleet-management-app/
          docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .
        '''
      }
    }

    stage('Trivy (Image Scan)') {
      steps {
        sh '''
          echo "Trivy image scan (non-blocking)"
          trivy image --no-progress \
            --severity HIGH,CRITICAL \
            ${DOCKER_IMAGE}:${BUILD_NUMBER} || true
        '''
      }
    }

    stage('Login & Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            set -e
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

            docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}

            docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
            docker push ${DOCKER_IMAGE}:latest

            # free space immediately (important on small EC2)
            docker rmi ${DOCKER_IMAGE}:${BUILD_NUMBER} || true
            docker rmi ${DOCKER_IMAGE}:latest || true
          '''
        }
      }
    }

    stage('Update GitOps Repo (Helm values)') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'gitops-creds',
          usernameVariable: 'GIT_USER',
          passwordVariable: 'GIT_PASS'
        )]) {
          sh '''
            set -e

            rm -rf fleet-gitops
            git clone https://$GIT_USER:$GIT_PASS@github.com/msafryx/fleet-gitops.git
            cd fleet-gitops

            echo "Before update:"
            grep -n "tag:" ${GITOPS_VALUES} || true

            # Update ONLY the tag line (keeps yaml indentation)
            sed -i 's|^[[:space:]]*tag: ".*"|  tag: "'"${BUILD_NUMBER}"'"|' ${GITOPS_VALUES}

            echo "After update:"
            grep -n "tag:" ${GITOPS_VALUES}

            git config user.email "jenkins@ci"
            git config user.name  "Jenkins CI"

            git add ${GITOPS_VALUES}
            git commit -m "frontend image -> ${BUILD_NUMBER}" || echo "Nothing to commit"
            git push
          '''
        }
      }
    }
  }

  post {
    always {
      sh '''
        echo "Cleaning docker to avoid disk full..."
        docker logout || true
        docker image prune -af || true
        docker builder prune -af || true
      '''
      cleanWs()
    }
  }
}
