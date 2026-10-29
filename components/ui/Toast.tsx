"use client";

import { useEffect, useState } from "react";

let showToastFn: ((msg: string) => void) | null = null;

export function toast(msg: string) {
  showToastFn?.(msg);
}

export function ToastHost() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showToastFn = (m) => {
      setMsg(m);
      setVisible(true);
      setTimeout(() => setVisible(false), 2800);
    };
    return () => {
      showToastFn = null;
    };
  }, []);

  return <div className={`toast${visible ? " show" : ""}`} role="status">{msg}</div>;
}
