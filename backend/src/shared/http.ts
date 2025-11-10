// minimal helper utilities for HTTP (extensible)
export const ok = <T>(data: T) => ({ ok: true, data });
export const fail = (message: string) => ({ ok: false, error: message });
