import { IExec, utils } from "iexec";
import { create } from "kubo-rpc-client";

const networkOutput = document.getElementById("network");
const addressOutput = document.getElementById("address");
const rlcWalletOutput = document.getElementById("rlc-wallet");
const nativeWalletOutput = document.getElementById("native-wallet");
const accountOutput = document.getElementById("account");
const accountDepositInput = document.getElementById("account-deposit-input");
const accountDepositButton = document.getElementById("account-deposit-button");
const accountDepositError = document.getElementById("account-deposit-error");
const accountWithdrawInput = document.getElementById("account-withdraw-input");
const accountWithdrawButton = document.getElementById(
  "account-withdraw-button",
);
const accountWithdrawError = document.getElementById("account-withdraw-error");
const datasetsShowInput = document.getElementById("datasets-address-input");
const datasetsShowButton = document.getElementById("datasets-show-button");
const datasetsShowError = document.getElementById("datasets-show-error");
const datasetShowOutput = document.getElementById("datasets-details-output");
const datasetsCountButton = document.getElementById("datasets-count-button");
const datasetsCountError = document.getElementById("datasets-count-error");
const datasetsCountOutput = document.getElementById("datasets-count-output");
const datasetsIndexInput = document.getElementById("datasets-index-input");
const datasetsShowIndexButton = document.getElementById(
  "datasets-showindex-button",
);
const datasetsShowIndexError = document.getElementById(
  "datasets-showindex-error",
);
const datasetsShowIndexOutput = document.getElementById(
  "datasets-showindex-output",
);

const datasetsGenerateKeyButton = document.getElementById(
  "datasets-generatekey-button",
);
const datasetsGenerateKeyError = document.getElementById(
  "datasets-generatekey-error",
);
const datasetsGenerateKeyOutput = document.getElementById(
  "datasets-generatekey-output",
);
const datasetsEncryptKeyInput = document.getElementById(
  "datasets-encryptkey-input",
);
const datasetsEncryptFileInput = document.getElementById(
  "datasets-encryptfile-input",
);
const datasetsEncryptButton = document.getElementById(
  "datasets-encrypt-button",
);
const datasetsEncryptError = document.getElementById("datasets-encrypt-error");
const datasetsEncryptOutput = document.getElementById(
  "datasets-encrypt-output",
);

const datasetsDeployNameInput = document.getElementById(
  "datasets-deployname-input",
);
const datasetsDeployMultiaddrInput = document.getElementById(
  "datasets-deploymultiaddr-input",
);
const datasetsDeployChecksumInput = document.getElementById(
  "datasets-deploychecksum-input",
);
const datasetsDeployButton = document.getElementById("datasets-deploy-button");
const datasetsDeployError = document.getElementById("datasets-deploy-error");
const datasetsDeployOutput = document.getElementById("datasets-deploy-output");

const pushSecretKeyInput = document.getElementById("pushsecret-key-input");
const pushSecretAddressInput = document.getElementById(
  "pushsecret-address-input",
);
const pushSecretButton = document.getElementById("push-secret-button");
const pushSecretError = document.getElementById("push-secret-error");
const pushSecretOutput = document.getElementById("push-secret-output");

const sellDatasetAddressInput = document.getElementById(
  "sell-datasetaddress-input",
);
const sellDatasetPriceInput = document.getElementById(
  "sell-datasetprice-input",
);
const sellDatasetVolumeInput = document.getElementById("sell-volume-input");
const sellDatasetApprestrictInput = document.getElementById(
  "sell-apprestrict-input",
);
const sellDatasetRequesterrestrictInput = document.getElementById(
  "sell-requesterrestrict-input",
);
const sellDatasetWorkerpoolrestrictInput = document.getElementById(
  "sell-workerpoolrestrict-input",
);
const sellDatasetTagInput = document.getElementById("sell-tag-input");
const sellPublishButton = document.getElementById("sell-publish-button");
const sellPublishError = document.getElementById("sell-publish-error");
const sellPublishOutput = document.getElementById("sell-publish-output");
const sellUnpublishOrderhashInput = document.getElementById(
  "sell-unpublishhash-input",
);
const sellUnpublishButton = document.getElementById("sell-unpublish-button");
const sellUnpublishError = document.getElementById("sell-unpublish-error");
const sellUnpublishOutput = document.getElementById("sell-unpublish-output");
const sellCancelOrderhashInput = document.getElementById(
  "sell-cancelhash-input",
);
const sellCancelButton = document.getElementById("sell-cancel-button");
const sellCancelError = document.getElementById("sell-cancel-error");
const sellCancelOutput = document.getElementById("sell-cancel-output");

const orderbookDatasetAddressInput = document.getElementById(
  "orderbook-datasetaddress-input",
);
const orderbookApprestrictInput = document.getElementById(
  "orderbook-apprestrict-input",
);
const orderbookRequesterrestrictInput = document.getElementById(
  "orderbook-requesterrestrict-input",
);
const orderbookWorkerpoolrestrictInput = document.getElementById(
  "orderbook-workerpoolrestrict-input",
);
const orderbookShowButton = document.getElementById("orderbook-show-button");
const orderbookShowError = document.getElementById("orderbook-show-error");
const orderbookShowOutput = document.getElementById("orderbook-show-output");

const refreshUser = (iexec) => async () => {
  const userAddress = await iexec.wallet.getAddress();
  const [wallet, account] = await Promise.all([
    iexec.wallet.checkBalances(userAddress),
    iexec.account.checkBalance(userAddress),
  ]);
  const nativeWalletText = `${utils.formatEth(wallet.wei)} ether`;
  const rlcWalletText = `${utils.formatRLC(wallet.nRLC)} RLC`;
  addressOutput.innerText = userAddress;
  rlcWalletOutput.innerHTML = rlcWalletText;
  nativeWalletOutput.innerHTML = nativeWalletText;
  accountOutput.innerText = `${utils.formatRLC(
    account.stake,
  )} RLC (+ ${utils.formatRLC(account.locked)} RLC locked)`;
};

const deposit = (iexec) => async () => {
  try {
    accountDepositButton.disabled = true;
    accountDepositError.innerText = "";
    const amount = accountDepositInput.value;
    await iexec.account.deposit(amount);
    refreshUser(iexec)();
  } catch (error) {
    accountDepositError.innerText = error;
  } finally {
    accountDepositButton.disabled = false;
  }
};

const withdraw = (iexec) => async () => {
  try {
    accountWithdrawButton.disabled = true;
    accountWithdrawError.innerText = "";
    const amount = accountWithdrawInput.value;
    await iexec.account.withdraw(amount);
    refreshUser(iexec)();
  } catch (error) {
    accountWithdrawError.innerText = error;
  } finally {
    accountWithdrawButton.disabled = false;
  }
};

const showDataset = (iexec) => async () => {
  try {
    datasetsShowButton.disabled = true;
    datasetsShowError.innerText = "";
    datasetShowOutput.innerText = "";
    const datasetAddress = datasetsShowInput.value;
    const res = await iexec.dataset.showDataset(datasetAddress);
    datasetShowOutput.innerText = JSON.stringify(res, null, 2);
  } catch (error) {
    datasetsShowError.innerText = error;
  } finally {
    datasetsShowButton.disabled = false;
  }
};

const showDatasetByIndex = (iexec) => async () => {
  try {
    datasetsShowIndexButton.disabled = true;
    datasetsShowIndexError.innerText = "";
    datasetsShowIndexOutput.innerText = "";
    const datasetIndex = datasetsIndexInput.value;
    const res = await iexec.dataset.showUserDataset(
      datasetIndex,
      await iexec.wallet.getAddress(),
    );
    datasetsShowIndexOutput.innerText = JSON.stringify(res, null, 2);
  } catch (error) {
    datasetsShowIndexError.innerText = error;
  } finally {
    datasetsShowIndexButton.disabled = false;
  }
};

const countDatasets = (iexec) => async () => {
  try {
    datasetsCountButton.disabled = true;
    datasetsCountError.innerText = "";
    datasetsCountOutput.innerText = "";
    const count = await iexec.dataset.countUserDatasets(
      await iexec.wallet.getAddress(),
    );
    datasetsCountOutput.innerText = `total deployed datasets ${count}`;
  } catch (error) {
    datasetsCountError.innerText = error;
  } finally {
    datasetsCountButton.disabled = false;
  }
};

const generateDatasetKey = (iexec) => () => {
  try {
    datasetsGenerateKeyError.innerText = "";
    datasetsGenerateKeyOutput.innerText = "";
    const key = iexec.dataset.generateEncryptionKey();
    datasetsGenerateKeyOutput.innerText = `Generated key: ${key}`;
    datasetsEncryptKeyInput.value = key;
  } catch (error) {
    datasetsGenerateKeyError.innerText = error;
  } finally {
    datasetsGenerateKeyButton.disabled = false;
  }
};

const encryptDataset = (iexec, ipfs) => async () => {
  try {
    datasetsEncryptButton.disabled = true;
    datasetsEncryptError.innerText = "";
    datasetsEncryptOutput.innerText = "";
    const file = datasetsEncryptFileInput.files[0];
    if (!file) {
      throw Error("No file selected");
    }
    if (file.size > 500) {
      throw Error(
        "File too large, this is a demo, please use small files (>=500 bytes)",
      );
    }

    datasetsEncryptOutput.innerText = `Reading ${file.name}`;
    const fileBytes = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => resolve(e.target.result);
      fileReader.onerror = () =>
        reject(Error(`Failed to read file: ${fileReader.error}`));
      fileReader.onabort = () => reject(Error(`Failed to read file: aborted`));
    });

    const key = datasetsEncryptKeyInput.value;

    datasetsEncryptOutput.innerText = `Encrypting ${file.name}`;
    const encrypted = await iexec.dataset.encrypt(fileBytes, key);
    const checksum =
      await iexec.dataset.computeEncryptedFileChecksum(encrypted);

    datasetsEncryptOutput.innerText = "Uploading encrypted file to IPFS";
    const ipfs = create("/dns4/ipfs-upload.v8-bellecour.iex.ec/https/");
    const uploadResult = await ipfs.add(encrypted);
    const { cid } = uploadResult;
    const multiaddr = `ipfs/${cid.toString()}`;
    const publicUrl = `https://ipfs-gateway.v8-bellecour.iex.ec/${multiaddr}`;

    datasetsEncryptOutput.innerText = "Checking file on IPFS";
    await fetch(publicUrl).then((res) => {
      if (!res.ok) {
        throw Error(`Failed to load uploaded file at ${publicUrl}`);
      }
    });

    const a = document.createElement("a");
    a.href = publicUrl;
    a.text = publicUrl;
    a.target = "_blank";
    datasetsEncryptOutput.innerText = `File encrypted and uploaded to IPFS (checksum ${checksum})\n`;
    datasetsEncryptOutput.appendChild(a);

    datasetsDeployNameInput.value = file.name;
    datasetsDeployMultiaddrInput.value = multiaddr;
    datasetsDeployChecksumInput.value = checksum;
    pushSecretKeyInput.value = key;
  } catch (error) {
    datasetsEncryptError.innerText = error;
    datasetsEncryptOutput.innerText = "";
  } finally {
    datasetsEncryptButton.disabled = false;
  }
};

const deployDataset = (iexec) => async () => {
  try {
    datasetsDeployButton.disabled = true;
    datasetsDeployError.innerText = "";
    datasetsDeployOutput.innerText = "";
    const owner = await iexec.wallet.getAddress();
    const name = datasetsDeployNameInput.value;
    const multiaddr = datasetsDeployMultiaddrInput.value;
    const checksum = datasetsDeployChecksumInput.value;
    const { address } = await iexec.dataset.deployDataset({
      owner,
      name,
      multiaddr,
      checksum,
    });
    datasetsDeployOutput.innerText = `Dataset deployed at address ${address}`;
    pushSecretAddressInput.value = address;
    datasetsShowInput.value = address;
    sellDatasetAddressInput.value = address;
    orderbookDatasetAddressInput.value = address;
    refreshUser(iexec)();
  } catch (error) {
    datasetsDeployError.innerText = error;
  } finally {
    datasetsDeployButton.disabled = false;
  }
};

const pushSecret = (iexec) => async () => {
  try {
    pushSecretButton.disabled = true;
    pushSecretError.innerText = "";
    pushSecretOutput.innerText = "";
    const datasetAddress = pushSecretAddressInput.value;
    const key = pushSecretKeyInput.value;
    await iexec.dataset.pushDatasetSecret(datasetAddress, key);
    pushSecretOutput.innerText = `Encryption key pushed for dataset ${datasetAddress}`;
  } catch (error) {
    pushSecretError.innerText = error;
  } finally {
    pushSecretButton.disabled = false;
  }
};

const publishOrder = (iexec) => async () => {
  try {
    sellPublishButton.disabled = true;
    sellPublishError.innerText = "";
    sellPublishOutput.innerText = "";
    const dataset = sellDatasetAddressInput.value;
    const datasetprice = sellDatasetPriceInput.value;
    const volume = sellDatasetVolumeInput.value;
    const apprestrict = sellDatasetApprestrictInput.value;
    const requesterrestrict = sellDatasetRequesterrestrictInput.value;
    const workerpoolrestrict = sellDatasetWorkerpoolrestrictInput.value;
    const tag = sellDatasetTagInput.value;
    const signedOrder = await iexec.order.signDatasetorder(
      await iexec.order.createDatasetorder({
        dataset,
        datasetprice,
        volume,
        apprestrict,
        requesterrestrict,
        workerpoolrestrict,
        tag,
      }),
    );
    const orderHash = await iexec.order.publishDatasetorder(signedOrder);
    sellPublishOutput.innerText = `Order published with hash ${orderHash}`;
    sellUnpublishOrderhashInput.value = orderHash;
    sellCancelOrderhashInput.value = orderHash;
  } catch (error) {
    sellPublishError.innerText = error;
  } finally {
    sellPublishButton.disabled = false;
  }
};

const unpublishOrder = (iexec) => async () => {
  try {
    sellUnpublishButton.disabled = true;
    sellUnpublishError.innerText = "";
    sellUnpublishOutput.innerText = "";
    const orderHash = sellUnpublishOrderhashInput.value;
    const unpublishedOrderHash =
      await iexec.order.unpublishDatasetorder(orderHash);
    sellUnpublishOutput.innerText = `Order with hash ${unpublishedOrderHash} is unpublished`;
  } catch (error) {
    sellUnpublishError.innerText = error;
  } finally {
    sellUnpublishButton.disabled = false;
  }
};

const cancelOrder = (iexec) => async () => {
  try {
    sellCancelButton.disabled = true;
    sellCancelError.innerText = "";
    sellCancelOutput.innerText = "";
    const orderHash = sellCancelOrderhashInput.value;
    const { order } = await iexec.orderbook.fetchDatasetorder(orderHash);
    const { txHash } = await iexec.order.cancelDatasetorder(order);
    sellCancelOutput.innerText = `Order canceled (tx:${txHash})`;
    refreshUser(iexec)();
  } catch (error) {
    sellCancelError.innerText = error;
  } finally {
    sellCancelButton.disabled = false;
  }
};

const showOrderbook = (iexec) => async () => {
  try {
    orderbookShowButton.disabled = true;
    orderbookShowError.innerText = "";
    orderbookShowOutput.innerText = "";
    const datasetAddress = orderbookDatasetAddressInput.value;
    const app = orderbookApprestrictInput.value;
    const requester = orderbookRequesterrestrictInput.value;
    const workerpool = orderbookWorkerpoolrestrictInput.value;
    const res = await iexec.orderbook.fetchDatasetOrderbook(datasetAddress, {
      app,
      requester,
      workerpool,
    });
    orderbookShowOutput.innerText = JSON.stringify(res, null, 2);
  } catch (error) {
    orderbookShowError.innerText = error;
  } finally {
    orderbookShowButton.disabled = false;
  }
};

const init = async () => {
  try {
    let ethProvider;
    if (window.ethereum) {
      console.log("using default provider");
      ethProvider = window.ethereum;
      ethProvider.on("chainChanged", (_chainId) => window.location.reload());
      ethProvider.on("accountsChanged", (_accounts) =>
        window.location.reload(),
      );
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x86",
            chainName: "iExec Sidechain",
            nativeCurrency: {
              name: "xRLC",
              symbol: "xRLC",
              decimals: 18,
            },
            rpcUrls: ["https://bellecour.iex.ec"],
            blockExplorerUrls: ["https://blockscout-bellecour.iex.ec"],
          },
        ],
      });
    } else {
      throw Error("Missing provider");
    }

    const { result } = await new Promise((resolve, reject) =>
      ethProvider.sendAsync(
        {
          jsonrpc: "2.0",
          method: "net_version",
          params: [],
        },
        (err, res) => {
          if (!err) resolve(res);
          reject(Error(`Failed to get network version from provider: ${err}`));
        },
      ),
    );
    const networkVersion = result;

    if (networkVersion !== "134") {
      const error = `Unsupported network ${networkVersion}, please switch to iExec Sidechain`;
      networkOutput.innerText = error;
      throw Error(error);
    }

    networkOutput.innerText = networkVersion;
    const iexec = new IExec({
      ethProvider,
    });

    await refreshUser(iexec)();

    accountDepositButton.addEventListener("click", deposit(iexec));
    accountWithdrawButton.addEventListener("click", withdraw(iexec));
    datasetsShowButton.addEventListener("click", showDataset(iexec));
    datasetsCountButton.addEventListener("click", countDatasets(iexec));
    datasetsShowIndexButton.addEventListener(
      "click",
      showDatasetByIndex(iexec),
    );
    datasetsGenerateKeyButton.addEventListener(
      "click",
      generateDatasetKey(iexec),
    );
    datasetsEncryptButton.addEventListener("click", encryptDataset(iexec));
    datasetsDeployButton.addEventListener("click", deployDataset(iexec));
    pushSecretButton.addEventListener("click", pushSecret(iexec));
    sellPublishButton.addEventListener("click", publishOrder(iexec));
    sellUnpublishButton.addEventListener("click", unpublishOrder(iexec));
    sellCancelButton.addEventListener("click", cancelOrder(iexec));
    orderbookShowButton.addEventListener("click", showOrderbook(iexec));
    accountDepositButton.disabled = false;
    accountWithdrawButton.disabled = false;
    datasetsShowButton.disabled = false;
    datasetsCountButton.disabled = false;
    datasetsShowIndexButton.disabled = false;
    datasetsGenerateKeyButton.disabled = false;
    datasetsEncryptButton.disabled = false;
    pushSecretButton.disabled = false;
    datasetsDeployButton.disabled = false;
    sellPublishButton.disabled = false;
    sellUnpublishButton.disabled = false;
    sellCancelButton.disabled = false;
    orderbookShowButton.disabled = false;
    console.log("initialized");
  } catch (e) {
    console.error(e.message);
  }
};

init();
