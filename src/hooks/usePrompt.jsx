import { render, unmountComponentAtNode } from "react-dom";
import useBlocker from "./useBlocker";
import { useCallback } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function usePrompt(message, when = true) {
  const blocker = useCallback(
    (tx) => {
      const element = document.createElement("div");
      element.setAttribute("id", "prompt-dialog-container");
      element.setAttribute("aria-hidden", "true");

      const closePrompt = (state) => {
        if (element) {
          unmountComponentAtNode(element);
        }
        if (!state) {
          document.body.removeChild(element);
        } else {
          tx.retry();
        }
      };

      document.body.appendChild(element);

      const headerStyle = {
        backgroundColor: '#183661',
        color: 'white'
      };    

      render(
        <Modal isOpen={!!message}>
          <ModalHeader style={headerStyle}>CẢNH BÁO</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => closePrompt(true)}>
              Ok
            </Button>
            <Button color="secondary" onClick={() => closePrompt(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>,
        element
      );
    },
    [message]
  );

  useBlocker(blocker, when);
}
