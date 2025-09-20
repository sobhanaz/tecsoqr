import QRCode from "qrcode";
import type {
  QRCodeContent,
  QRCodeCustomization,
  QRCodeOutput,
  QRCodeVCard,
  QRCodeWiFi,
} from "@/types/qr-code";

export class QRCodeService {
  private static encodeVCard(vcard: QRCodeVCard): string {
    const fields = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${vcard.lastName};${vcard.firstName}`,
      `FN:${vcard.firstName} ${vcard.lastName}`,
      vcard.organization && `ORG:${vcard.organization}`,
      vcard.title && `TITLE:${vcard.title}`,
      vcard.workPhone && `TEL;TYPE=WORK:${vcard.workPhone}`,
      vcard.homePhone && `TEL;TYPE=HOME:${vcard.homePhone}`,
      vcard.mobilePhone && `TEL;TYPE=CELL:${vcard.mobilePhone}`,
      vcard.workFax && `TEL;TYPE=WORK,FAX:${vcard.workFax}`,
      vcard.homeFax && `TEL;TYPE=HOME,FAX:${vcard.homeFax}`,
      vcard.email && `EMAIL:${vcard.email}`,
      vcard.website && `URL:${vcard.website}`,
      vcard.street &&
        vcard.city &&
        `ADR:;;${vcard.street};${vcard.city};${vcard.state || ""};${
          vcard.zipCode || ""
        };${vcard.country || ""}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\\n");

    return fields;
  }

  private static encodeWiFi(wifi: QRCodeWiFi): string {
    const fields = [
      "WIFI:",
      `T:${wifi.encryption}`,
      `S:${wifi.ssid}`,
      wifi.password && `P:${wifi.password}`,
      wifi.hidden ? "H:true" : undefined,
    ]
      .filter(Boolean)
      .join(";");

    return fields + ";";
  }

  private static formatContent(content: QRCodeContent): string {
    switch (content.type) {
      case "url":
        return content.url;
      case "text":
        return content.text;
      case "email": {
        const emailParts = [
          "mailto:" + content.email,
          content.subject && "subject=" + encodeURIComponent(content.subject),
          content.body && "body=" + encodeURIComponent(content.body),
        ].filter(Boolean);
        return emailParts.join("?");
      }
      case "phone":
        return "tel:" + content.number;
      case "sms":
        return `smsto:${content.number}${
          content.message ? ":" + content.message : ""
        }`;
      case "vcard":
        return this.encodeVCard(content);
      case "mecard":
        return `MECARD:N:${content.name};TEL:${content.phone || ""};EMAIL:${
          content.email || ""
        };URL:${content.website || ""};ADR:${content.address || ""};`;
      case "location":
        return `geo:${content.latitude},${content.longitude}${
          content.name ? "?q=" + encodeURIComponent(content.name) : ""
        }`;
      case "wifi":
        return this.encodeWiFi(content);
      case "event":
        return [
          "BEGIN:VEVENT",
          `SUMMARY:${content.title}`,
          content.description && `DESCRIPTION:${content.description}`,
          content.location && `LOCATION:${content.location}`,
          `DTSTART:${content.startDate.toISOString()}`,
          content.endDate && `DTEND:${content.endDate.toISOString()}`,
          "END:VEVENT",
        ]
          .filter(Boolean)
          .join("\\n");
      case "bitcoin":
        return `bitcoin:${content.address}${
          content.amount ? "?amount=" + content.amount : ""
        }${content.label ? "&label=" + encodeURIComponent(content.label) : ""}${
          content.message
            ? "&message=" + encodeURIComponent(content.message)
            : ""
        }`;
      case "facebook":
        return "https://facebook.com/" + content.username;
      case "twitter":
        return "https://twitter.com/" + content.username;
      case "youtube":
        return "https://youtube.com/" + content.username;
      default:
        throw new Error("Unsupported QR code type");
    }
  }

  public static async generateQRCode(
    content: QRCodeContent,
    customization?: QRCodeCustomization,
    output: QRCodeOutput = {
      format: "svg",
      size: 1000,
      margin: 4,
      errorCorrectionLevel: "M",
    }
  ): Promise<string> {
    const text = this.formatContent(content);

    // Validate that we have content to encode
    if (!text || text.trim() === "") {
      throw new Error("No input text");
    }

    try {
      if (output.format === "svg") {
        // Generate SVG QR code
        const svg = await QRCode.toString(text, {
          type: "svg",
          width: output.size,
          margin: output.margin,
          errorCorrectionLevel: output.errorCorrectionLevel,
          color: {
            dark: customization?.foreground || "#000000",
            light: customization?.background || "#ffffff",
          },
        });

        return svg;
      } else {
        // For non-SVG formats, use regular QR code generation
        const dataUrl = await QRCode.toDataURL(text, {
          width: output.size,
          margin: output.margin,
          errorCorrectionLevel: output.errorCorrectionLevel,
          color: {
            dark: customization?.foreground || "#000000",
            light: customization?.background || "#ffffff",
          },
        });
        return dataUrl;
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to generate QR code");
    }
  }
}
