pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "muhammedsafry/fleet-management-front-end"
        GITOPS_REPO = "https://github.com/msafryx/fleet-gitops.git"   // 🔹 your GitOps repo
        GITOPS_PATH = "services/frontend/deployment.yaml"              // 🔹 path inside repo
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
                sh 'echo "Run your tests here (npm test / build etc.)"'
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
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest
                    docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitops-creds',         // 🔹 create this in Jenkins
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                    sh '''
                    rm -rf fleet-gitops
                    git clone https://$GIT_USER:$GIT_PASS@github.com/msafryx/fleet-gitops.git

                    cd fleet-gitops

                    # Update image line in deployment.yaml
                    sed -i "s|image: .*|image: '''"$DOCKER_IMAGE:$BUILD_NUMBER"'''|" $GITOPS_PATH

                    git config user.email "jenkins@ci.local"
                    git config user.name "Jenkins CI"

                    git add $GITOPS_PATH
                    git commit -m "Frontend image updated to $DOCKER_IMAGE:$BUILD_NUMBER (build $BUILD_NUMBER)" || echo "No changes to commit"
                    git push
                    '''
                }
            }
        }
    }
}
