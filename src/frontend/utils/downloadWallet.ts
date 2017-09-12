export const downloadWallet = ( wallet: string, address: string ) => {
    let element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(wallet)}`);
    element.setAttribute('download', `UTC-${address}`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
