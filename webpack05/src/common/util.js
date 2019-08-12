exports.loadjs = async function (filePath, globalName) {
    if (!window[globalName]) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.type = "text/javascript"
            script.src = filePath
            script.onload = () => {
                resolve(window[globalName])
            }
            document.querySelector('body').appendChild(script)
        })
    } else {
        return new Promise((resolve, reject) => {
            resolve(window[globalName])
        })
    }
}