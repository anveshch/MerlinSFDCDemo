import { LightningElement, api } from 'lwc';
export default class Placeholder extends LightningElement {
    // #defaultMsg - Sets the default msg stating that Products are not available
    @api message;

    // Set the GE Logo
    logoUrl = 'https://www.merlinannualpass.co.uk/media/xg5paxpn/merlin-annual-pass-orb-400x400.png'; //#Hardcoded
}