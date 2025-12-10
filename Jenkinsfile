pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "muhammedzafry10/fleet-management-front-end"  // 🔹 change this
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',                        // 🔹 change branch if needed
                    url: 'https://github.com/msafryx/fleet-management-front-end.git'  // 🔹 change URL
            }
        }

        stage('Build & Test') {
            steps {
                sh 'echo "Run your tests here (npm test / mvn test etc.)"'
                // Example for Node.js:
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
                    credentialsId: 'dockerhub-creds',       // 🔹 from earlier
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
    }
}
