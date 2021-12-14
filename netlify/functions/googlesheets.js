const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context, callback) => {
    let private_key_string = "-----BEGIN PRIVATE KEY-----\n" + process.env.GOOGLE_PRIVATE_KEY + "\nbIuS5Mb79EfPvii5UB9SkVIzisEnNcp+6V/oP8wsk+Dt0Kcjn8wvHOX1p1Ci6myQ\nyvETyO+nUJ9pG2eEIz0uXGNe1q6yjDZSzG4DOvScFf7r9FfQZwIInnS0TbUjpS/w\n1VjCTvCpwlQ8WK816k0hr34nHj5WTTitU08pI2nszBRRF/jLZ4QYETtqpD47Isvl\nO6Seg7pVgfMcaZe//gpsxiP7Q0SqWrB3v2pv97ZTebSw8LX1rUWIdGvSlYKm0S8S\nkiwgzaQRaXyXtjm8HxUErI2N3Tpct++4vadYZZrsBEp3qqoClaAPI+5wn4/Uq2p5\npfnbLDc9AgMBAAECggEAUPe2FazjdCagZpZNtAuIEa3nRXfioREv/oybNIOniSBG\nHWOWMqoZBHNE8Bk1I/Qz+2mJDf/gHJXgGpy1HQUsjx2L3q3gyGolaY0PcG+koBoT\nDIxvjACX1dYUubTl+yBCZOqAax+DsHvsUNEgSrz86BqdZ8JWELaQviupSkKbL60b\nTvrO23ypGDxhGY2lg0FkjtYKHcvkAE+Z/iRv+ObDZ92Kxq8439fq7j78/KoO4UwY\n45UGm7arETfoWnD39MB3M8SaNdyvRS6kX3HrYD4TnVhaY7xSWqdwh467TtgWTIi0\nPgBp8kVyzclzi4+gQw+lzPl26sVAf4hkOhEXFjqS6QKBgQDwbA1hL/jeU98cWt++\no5hsgPCsTeUGbckO78mVCI3AUpjVqyRGKRw5ClMw3wvM7tql5iM0VWfAhWNfVHi2\nQTkBEHQangtr3sbd5GmuSGHXW3rYHp47kOo1lfiOalGu8NCWKKgpY082ivn4pvRM\n7jD3bJwaeg/9CM3kTXbfYojT3wKBgQDMyp2iM1Rnz28LPl0zyCyMl8oqT0wgZjsB\nESXYKSuWEtx4r/U11gtXoKxDHVbHQc9V5X2bvG1X4deFPHaj9Z+/e+Gt1vbmPIH2\nCzr3mWxzUya0/QMT6LeUmXwhdJwRlgnSiEPi2Q2C/MWlCTo8BcCQ1qWO2l7ZLW6g\nhRlcp0a4YwKBgBNweSh5i4LWfzy4sEymx6VGS69y4OjDKbWWd9MgDO4W/5qPKvCt\nVEXcatuRvU+FpJIzaHdLzIbJgj5sAxKhdW17mheo3b2MFsJMPKtF2PtjvywIVbz1\nO6q3hJBnUlF10TfC883c5MPBOvL69NffjoAC/SA67F4GPzeNd+YZ/nw7AoGAUs3+\nTO5aS5tJOA+gWeavdK2PVeo4SsVrSDQpzCxhbk30DWyARqNkdKsH3B9JzkmizwV6\n83SN9cHghgP7qLIRRLiPeN35eQCwP88sqZ7EhiDx/q5rByrKx/ADi/d9f3LeR91H\nLbs7xmH0fJWtkUV2JlpUGN3dCg1ftNH8fkU4yCcCgYEAq5lDnvAuc9IP/iDKCpW5\nM0CzV5EincJplBAjA8u2QRGoPnRO53+jxt6Yj5gQWI6pOCNpt+Vl/5Hp1G686Yop\nhOi9VGdlAQ9XPmCIWxsmTM27kjWhkRp9yMmRwiQAAEqvxDI2g89Y0Yxq/yIQ8nNX\n2IaKoefgEQ4v2TUwm7LtlkE=\n-----END PRIVATE KEY-----\n"
    try {
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: private_key_string.replace(/\\n/g, "\n")
        });
        await doc.loadInfo()
        // careful, api automatically uses first row as header
        // so make sure there is an extra row there
        // and that an non empty columns exists after the last filled column in that top row
        let sheet_data = await doc.sheetsByIndex[0].getRows()
        let headerValues = doc.sheetsByIndex[0].headerValues
        let items = []
        sheet_data.forEach((sheet_datum) => {
            let item = {}
            headerValues.forEach((headerValue) => {
                item[headerValue] = sheet_datum[headerValue]
            })
            items.push(item)
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ items: items }),
        }
    } catch (err) {
        return { statusCode: 500, body: err.toString() }
    }
}