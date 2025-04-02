class Log {

    public log(message: string): void {
        const time = new Date().toLocaleTimeString('bg-BG').split(' ')[0];
        window.console.log("%c ["+ time + "] " + message, "background-color: #081E25; color:rgb(87, 255, 53); padding:12px; font-size:1.5rem; font-weight: bold;")
    }
}

export default new Log();
