let io;

export const initSocket = async (server) => {
    io = new (await import('socket.io')).Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.on('connection', (socket) => {
        console.log("connection successful", socket.id)

        socket.on('disconnect', () => {
            console.log("user disconnected", socket.id)
        })
    })
}

export const goIo = () => {
    if (!io) {
        throw new Error('Socket connection not established....')
    } else {
        return io;
    }
}

