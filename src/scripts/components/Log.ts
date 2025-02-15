class Log {

    time: Date;

    constructor() {
        this.time = new Date();
    }

    public log(message: string): void {
        const time = this.time.toLocaleTimeString('bg-BG').split(' ')[0];
        window.console.log("%c ["+ time + "] " + message, "background-color: #081E25; color:rgb(255, 53, 127); padding:12px; font-size:1.5rem; font-weight: bold;")
    }

}

export default new Log();
