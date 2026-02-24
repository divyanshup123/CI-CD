import { Message, ReplyMessageType } from '../../types';

export const senderMessage = (text: string): Message => {
  return {
    id: `msg001${Date.now()}`,
    senderId: 'user_001',
    text: text,
    timestamp: `${Date()}`,
    status: 'read',
    type: 'text',
  };
};

export const assistantMessage = (
  text: string,
  messageType: ReplyMessageType,
): Message => {
  return {
    id: `msg001${Date.now()}`,
    senderId: 'ai_assistant_001',
    text: text,
    metadata: messageType == 'image' ? { url: text } : undefined,
    timestamp: `${Date()}`,
    status: 'read',
    type: messageType,
  };
};

export const formatDate = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedDate;

  //   return dateString
  //     ? moment(dateString).format('hh:mm a')
  //     : moment().format('hh:mm a');
};

const shortHandHexRegex = /^#?([a-z\d])([a-z\d])([a-z\d])$/i;
const longHandHexRegex =
  /^#?([a-z\d]{2})([a-z\d]{2})([a-z\d]{2})([a-z\d]{2})?$/i;
const rgbaRegex =
  /^rgba?\((25[0-5]|2[0-4]\d|1?\d{1,2}),\s*(25[0-5]|2[0-4]\d|1?\d{1,2}),\s*(25[0-5]|2[0-4]\d|1?\d{1,2})(,\s*(0?\.\d+|1(\.0+)?|0|1))?\)$/;

const modifyHexToLong = (_: string, r: string, g: string, b: string) => {
  return r + r + g + g + b + b;
};

export const hexToRgb = (hex: string) => {
  if (rgbaRegex.test(hex)) {
    const match = hex.match(rgbaRegex);
    if (match) {
      const red = match[1];
      const green = match[2];
      const blue = match[3];
      const alpha = match[4];
      return alpha
        ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
        : `rgba(${red}, ${green}, ${blue},0.07)`;
    }
    return null;
  }

  if (shortHandHexRegex.test(hex)) {
    hex = hex.replace(shortHandHexRegex, modifyHexToLong);
  }

  const result = longHandHexRegex.exec(hex) ?? null;
  if (result) {
    const red = parseInt(result[1] as string, 16);
    const green = parseInt(result[2] as string, 16);
    const blue = parseInt(result[3] as string, 16);
    const alpha =
      Number(result[4]) <= 30
        ? parseInt(result[4] as string, 16) / 255
        : '0.07';

    return alpha
      ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
      : `rgba(${red}, ${green}, ${blue},0.07)`;
  } else {
    return null;
  }
};
