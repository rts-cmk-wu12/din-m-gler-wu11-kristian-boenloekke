export default function DetailTable({ home }) {
    return (
        <>
            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="py-1">Sagsnummer</td>
                        <td className="py-1">12345678</td>
                    </tr>
                    <tr>
                        <td className="py-1">Boligeareal</td>
                        <td className="py-1">{home.livingspace} m²</td>
                    </tr>
                    <tr>
                        <td className="py-1">Grundareal</td>
                        <td className="py-1">{home.lotsize} m²</td>
                    </tr>
                    <tr>
                        <td className="py-1">Rum/værelser</td>
                        <td className="py-1">{home.rooms}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Antal Plan</td>
                        <td className="py-1">-</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="py-1">Kælder</td>
                        <td className="py-1">{home.basementsize === 0 || home.basementsize == null ? "-" : `${home.basementsize} m²`}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Byggeår</td>
                        <td className="py-1">{home.built}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Ombygget</td>
                        <td className="py-1">{home.remodel ? home.remodel : '-'}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Energimærke</td>
                        <td className="py-1">{home.energylabel}</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="py-1">Udbetaling</td>
                        <td className="py-1">Kr. 500.000</td>
                    </tr>
                    <tr>
                        <td className="py-1">Brutto ex ejerudgift</td>
                        <td className="py-1">Kr. {home.gross.toLocaleString("da-DK")}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Netto ex ejerudgift</td>
                        <td className="py-1">Kr. {home.netto.toLocaleString("da-DK")}</td>
                    </tr>
                    <tr>
                        <td className="py-1">Ejerudgifter</td>
                        <td className="py-1">Kr. {home.cost.toLocaleString("da-DK")}</td>
                    </tr>
                </tbody>
            </table>
        </>

    )
}