module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/user-availability/me',
            handler: 'user-availability.updateMe',
            config: {
                prefix: '',
            },
        }
    ]
}