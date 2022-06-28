import Services from "./BaseService"

const service = new Services("converter")

export default {
  listCryptoCurrencies: () => service.get("?type=CRYPTO"),
  listFiatCurrencies: () => service.get("?type=FIAT"),
}
