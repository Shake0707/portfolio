import { ETerminalTextSysResponse, ETerminalUrls } from "@/types/terminal.type";

export class Terminal {
    system: string = "";
    user: string | null = null;
    redirectUrl: string | null = null;
    eggs: string | null = null;
    game: string | null = null;

    private afterAnswer() {
        if (!this.user) return;
        const userText = this.user.trim().toLocaleLowerCase();
        if (userText === "1" || userText === "2" || userText === "3") {
            this.system = ETerminalTextSysResponse.ifCorrect;
            switch (userText) {
                case "1":
                    this.redirectUrl = "/" + ETerminalUrls.about.toLowerCase();
                    break;
                case "2":
                    this.game = ETerminalUrls.tetris.toLocaleLowerCase();
                    this.system = ETerminalTextSysResponse.ifGame;
                    break;
                case "3":
                    this.redirectUrl = "/" + ETerminalUrls.contacts.toLowerCase();
                    break;
            }
        } else if (userText === "front end") {
            this.system = "It's hell mf";
        } else if (userText === "16" || userText === "birthday") {
            this.system = "On 16-march my birthday)";
        } else {
            this.system = ETerminalTextSysResponse.ifUncorrect;
        }
        this.user = null;
    }

    setAnswer(userTxt: string) {
        this.user = userTxt;
        this.afterAnswer();
    }
}