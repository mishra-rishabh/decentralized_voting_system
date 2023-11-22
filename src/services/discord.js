import axios from "axios";
import { DISCORD_WEBHOOK_URL } from "../constants/constants";

// Function to interact with Discord using a webhook
function Discord() {
    const Send = async (data) => {
        // Prepare the payload for the Discord webhook
        const body = {
            content: "Blockchain Event",            //  Message content
            tts: false,                             //  Text-to-speech setting
            embeds: [
                {
                    title: "Vote Casted",           //  Title of the embedded message
                    fields: [
                        {
                            name: "Voter",          //  Field name
                            value: data.voter,      //  Field value (provided voter data)
                            inline: true            //  Display field inline
                        },
                    ]
                }
            ]
        };

        try {
            //  Send a POST request to the Discord webhook URL with the prepared payload
            await axios.post(
                DISCORD_WEBHOOK_URL,
                body
            );
        } catch (err) {
            //  Log any errors that occur during the HTTP request
            console.error(err);
        }
    };

    //  Return an object with the Send function for external use
    return {
        Send
    };
}

export default Discord;