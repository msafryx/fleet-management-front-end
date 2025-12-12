pipeline {
    agent any

    environment {
        DOCKER_IMAGE           = "muhammedsafry/fleet-management-front-end"
        GITOPS_REPO            = "https://github.com/msafryx/fleet-gitops.git"
        GITOPS_DEPLOYMENT_PATH = "frontend/staging/deployment.yaml"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/msafryx/fleet-management-front-end.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh 'echo "Run your tests here (npm test / npm run build etc.)"'
                // Example:
                // sh 'npm install'
                // sh 'npm test || echo "No tests"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',   // your existing DockerHub creds
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                    docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest
                    docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitops-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                    sh """
                    set -e
        
                    rm -rf fleet-gitops
                    git clone https://$GIT_USER:$GIT_PASS@github.com/msafryx/fleet-gitops.git
                    cd fleet-gitops
        
                    echo "Before update:"
                    grep tag frontend/chart/fleet-frontend/values-staging.yaml || true
        
                    sed -i 's|tag: ".*"|tag: "${BUILD_NUMBER}"|' frontend/chart/fleet-frontend/values-staging.yaml
        
                    echo "After update:"
                    grep tag frontend/chart/fleet-frontend/values-staging.yaml
        
                    git config user.email "jenkins@ci"
                    git config user.name "Jenkins CI"
        
                    git add frontend/chart/fleet-frontend/values-staging.yaml
                    git commit -m "frontend image -> ${BUILD_NUMBER}" || echo "Nothing to commit"
                    git push
                    """
                }
            }
        }
    }
}
