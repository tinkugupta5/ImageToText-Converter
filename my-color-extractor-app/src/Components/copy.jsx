import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import "../App.css";
import { toast } from "react-toastify";


export default function Copy({ text }) {
  const [value, setValue] = useState("Try copy this :) Button UI will change!");
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    setValue(text);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied, text]);

  return (
    <div>
      <p className="textbox">
        {value}
        <div role="button" tabIndex={0}>
          <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
            <MdContentCopy
              onClick={() => toast.success("copied")}
              style={{ cursor: "pointer" }}
            />
          </CopyToClipboard>
        </div>
      </p>
    </div>
  );
}

