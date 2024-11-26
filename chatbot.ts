import * as twilio from "twilio";
import { Injectable } from "@nestjs/common";
import { ResponseUtilsService } from "src/services/utils-service";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SANDBOX_NUMBER,
  TWILIO_ACCOUNT_CONTENT_SID,
} from "src/core";

@Injectable()
export class WhatsappBotServices {
  CLIENT = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  constructor(private readonly response: ResponseUtilsService) {}

  async sendMessage(payload: Record<string, any>) {
    const { Body: body, WaId: from } = payload;
    console.log("---- body ----");
    console.log(payload);
    console.log("---- body ----");

    switch (true) {
      case body.toLowerCase().includes("hello"):
        await this.welcomeMessage(from);
        break;

      case body.toLowerCase().includes("shop"):
        await this.shop(from);
        break;

      case body.toLowerCase().includes("order"):
        await this.order(from);
        break;

      case body.toLowerCase().includes("know"):
        await this.know(from);
        break;
      default:
        break;
    }

    return this.response.success200Response({
      message: "Retrieved successfully",
      data: body,
    });
  }
  async welcomeMessage(from: string) {
    await this.CLIENT.messages.create({
      body: `
      Welcome to Cutstruct 😃
      Please select one of the following

      1) Shop on cutstruct

      2) Order on cutstruct

      3) Know more about Cutstruct

      `,
      contentSid: TWILIO_ACCOUNT_CONTENT_SID,
      from: `whatsapp:${TWILIO_SANDBOX_NUMBER}`,
      to: `whatsapp:+${from}`,
      contentVariables: JSON.stringify({
        // Add your key-value pairs here
        "1": "value1",
        "2": "value2",
      }),
    });
  }

  async shop(from: string) {
    await this.CLIENT.messages.create({
      body: `Please visit https://market-place.cutstruct.com to shop at our marketplace🤖.`,
      contentSid: TWILIO_ACCOUNT_CONTENT_SID,
      from: `whatsapp:${TWILIO_SANDBOX_NUMBER}`,
      to: `whatsapp:+${from}`,
      contentVariables: JSON.stringify({
        // Add your key-value pairs here
        "1": "value1",
        "2": "value2",
      }),
    });
  }

  async order(from: string) {
    await this.CLIENT.messages.create({
      body: `Please visit https://market-place.cutstruct.com/request to order at our marketplace🤖. `,
      contentSid: TWILIO_ACCOUNT_CONTENT_SID,
      from: `whatsapp:${TWILIO_SANDBOX_NUMBER}`,
      to: `whatsapp:+${from}`,
      contentVariables: JSON.stringify({
        // Add your key-value pairs here
        "1": "value1",
        "2": "value2",
      }),
    });
  }
  async know(from: string) {
    await this.CLIENT.messages.create({
      body: `Please visit https://www.cutstruct.com to know about Cutstruct🤖.`,
      contentSid: TWILIO_ACCOUNT_CONTENT_SID,
      from: `whatsapp:${TWILIO_SANDBOX_NUMBER}`,
      to: `whatsapp:+${from}`,
      contentVariables: JSON.stringify({
        // Add your key-value pairs here
        "1": "value1",
        "2": "value2",
      }),
    });
  }
}

// {
//     SmsMessageSid: 'SM8d268b9837c1e0a52f27967185fddbff',
//     NumMedia: '0',
//     ProfileName: 'Goody',
//     MessageType: 'text',
//     SmsSid: 'SM8d268b9837c1e0a52f27967185fddbff',
//     WaId: '2349018916522',
//     SmsStatus: 'received',
//     Body: 'Test bot',
//     To: 'whatsapp:+14155238886',
//     NumSegments: '1',
//     ReferralNumMedia: '0',
//     MessageSid: 'SM8d268b9837c1e0a52f27967185fddbff',
//     AccountSid: 'AC8c03a2966102d01ffd44c0d2a44a9bae',
//     From: 'whatsapp:+2349018916522',
//     ApiVersion: '2010-04-01'
//   }
