import { ETerminalTextSysResponse, ETerminalUrls } from "@/types/terminal.type";

export class Terminal {
    system: string = "";
    user: string | null = null;
    redirectUrl: string | null = null;
    eggs: string | null = null;

    private afterAnswer() {
        if (this.user === "1" || this.user === "2" || this.user === "3") {
            this.system = ETerminalTextSysResponse.ifCorrect;
            switch (this.user) {
                case "1":
                    this.redirectUrl = "/" + ETerminalUrls.about.toLowerCase();
                    break;
                case "2":
                    this.redirectUrl = "/" + ETerminalUrls.skills.toLowerCase();
                    break;
                case "3":
                    this.redirectUrl = "/" + ETerminalUrls.contacts.toLowerCase();
                    break;
            }
        } else if (this.user === "Optimus Prime".trim()) {
            
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