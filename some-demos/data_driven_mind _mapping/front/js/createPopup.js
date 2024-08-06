export class Popup {
  constructor(title, message) {
    this.title = title;
    this.message = message;
  }

  show(title, message, closeCallback) {
    this.title = title;
    this.message = message;
    const popupDiv = document.createElement('div');
    popupDiv.style.position = 'fixed';
    popupDiv.style.width = '250px';
    popupDiv.style.top = '50%';
    popupDiv.style.left = '50%';
    popupDiv.style.transform = 'translate(-50%, -50%)';
    popupDiv.style.backgroundColor = 'white';
    popupDiv.style.padding = '20px';
    popupDiv.style.border = '1px solid black';
    popupDiv.style.borderRadius = '5px';
    popupDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

    const titleH3 = document.createElement('h3');
    titleH3.textContent = this.title;
    titleH3.style.margin = '0';
    titleH3.style.cursor = 'default';

    const messageP = document.createElement('p');
    messageP.textContent = this.message;

    const closeP = document.createElement('p');
    closeP.textContent = 'X';
    closeP.style.position = 'absolute';
    closeP.style.top = '0'
    closeP.style.right = '20px'
    closeP.style.width = '20px'
    closeP.style.height = '20px'
    closeP.style.lineHeight = '20px'
    closeP.style.textAlign = 'center'
    closeP.style.cursor = 'pointer'
    closeP.addEventListener('click', () => {
      closeCallback()
      document.body.removeChild(popupDiv);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭';
    closeButton.addEventListener('click', () => {
      closeCallback()
      document.body.removeChild(popupDiv);
    });

    popupDiv.appendChild(titleH3);
    popupDiv.appendChild(messageP);
    popupDiv.appendChild(closeP);
    popupDiv.appendChild(closeButton);

    document.body.appendChild(popupDiv);
  }
}