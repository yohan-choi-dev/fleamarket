export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener('message', message => {
        if (message) return;
        const fd = new FormData();
        fd.append('image', message.data[0])
        fetch('http://localhost:5000/api/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/from-data',
                'Access-Control-Allow-Origin': true
            }, 
            body: fd 
        }).then(res => console.log(res)) 
            .catch(err => console.error(err));
        console.log('checkpoint')
        postMessage('hello');
    });
};
