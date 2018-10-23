// Name of the folder where the new application is being prepared.
// Must not exist in the application that is being deployed.
def deployFolder = 'deployment'

// Name of the archive that contains the new application.
// Must not exist in the application that is being deployed.
def deployTar = 'deployment.tar.gz'

// A map of deployment environments.
// Each element is a map with the following keys:
//  - host: The host url in format user@some.server.com
//  - port: The port number to connect to over SSH
//  - credentials: Name of credentials to use for ssh
//  - folder: The folder where the app is located on server
//  - url: The url where the site can be accessed
def deployEnvs = [
    develop: [
        host: 'synergic@lutra.visionapps.cz',
        port: 22,
        credentials: 'deploy_lutra',
        folder: '/home/synergic/webapps-data/reactui_dev',
        url: 'http://react-ui.dev.visionapps.cz',
    ],
]



node {
    try {
        stage('Checkout code') {
           checkout scm
        }

        stage('Prepare docker containers') {
           sh 'docker-compose build node'
        }

        def commit = sh(
           returnStdout: true,
           script: 'git rev-parse HEAD 2> /dev/null || exit 0'
        ).trim()

        if (deployEnvs.containsKey(env.BRANCH_NAME)) {
            stage("Build ${env.BRANCH_NAME}") {
                sh "sed -i \"s@__ASSET_VERSION__@${commit}@g\" demo/index.html"
                build(commit)
            }

            stage('Deploy') {
                createTar(deployTar)
                deploy(deployEnvs[env.BRANCH_NAME], deployTar, deployFolder)
                checkStatus(deployEnvs[env.BRANCH_NAME].url, 200)
                notifyOfDeploy(deployEnvs, env.BRANCH_NAME)
            }
        }
        else {
            stage("Build ${env.BRANCH_NAME}") {
                build(commit)
            }
        }
    } catch (err) {
        currentBuild.result = 'FAILURE'
        echo "DEPLOY ERROR: ${err.toString()}"
        emailext (
            recipientProviders: [[$class: 'DevelopersRecipientProvider']],
            subject: "Build ${env.JOB_NAME} [${env.BUILD_NUMBER}] failed",
            body: err.toString(),
            attachLog: true,
        )
        if (deployEnvs.containsKey(env.BRANCH_NAME)) {
            slackSend(color: 'danger', message: 'React UI: Build větve `${env.BRANCH_NAME}` selhal :thunder_cloud_and_rain:')
        }
    } finally {
        stage('Cleanup') {
            sh 'docker-compose stop'
            sh 'docker-compose rm --all --force'
        }
    }
}

def build(commit) {
    sh 'rm -rf node_modules'
    sh 'rm -rf demo/generated/*.js'
    sh 'docker-compose run node bash -c "sh /root/init-container.sh /workspace && su docker-container-user ./build.sh"'
}

def deploy(deployEnv, deployTar, deployFolder) {
    sshagent (credentials: [deployEnv.credentials]) {
        sh """ssh ${deployEnv.host} -p ${deployEnv.port} /bin/bash << EOF
            echo 'Creating deploy folder'
            cd ${deployEnv.folder}
            rm -rf ${deployFolder}
            mkdir ${deployFolder}
            cp .htaccess ${deployFolder}/.htaccess 2>/dev/null || :
            cp .htpasswd ${deployFolder}/.htpasswd 2>/dev/null || :
            rm -rf ${deployEnv.folder}.deploy
            mv ${deployEnv.folder}/${deployFolder} ${deployEnv.folder}.deploy
        """

        sh "scp -P ${deployEnv.port} demo/${deployTar} ${deployEnv.host}:${deployEnv.folder}.deploy"

        sh """ssh ${deployEnv.host} -p ${deployEnv.port} /bin/bash << EOF
            echo 'Finalizing deploy'
            cd ${deployEnv.folder}.deploy
            tar -mxzf ${deployTar}
            rm -rf ${deployEnv.folder}
            mv ${deployEnv.folder}.deploy ${deployEnv.folder}
            rm -f ${deployEnv.folder}/${deployTar}
        """
    }
}

def createTar(deployTar) {
    dir('demo') {
        sh "rm -f ${deployTar}"
        sh "tar -zcf ${deployTar} *"
    }
}

def notifyOfDeploy(deployBranches, currentBranch) {
    echo 'DEPLOY SUCCESSFUL'
    slackSend(
        color: 'good',
        message: "React UI: Větev `${currentBranch}` byla nasazena na: ${deployBranches[currentBranch].url} :sunny:"
    )
}

def checkStatus(url, code) {
    echo 'Checking website status'
    sh """
        httpCode=\$(curl -sL --connect-timeout 50 -w "%{http_code}\\n" $url -o /dev/null)
        if [ \$httpCode -eq $code ]; then
            echo 'Website status check passed.'
            exit 0
        else
            echo 'Website status check failed.'
            exit 1
        fi
    """
}
