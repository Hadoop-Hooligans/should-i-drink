import { useContext } from "react";
import { ClosestWellContext, SelectedLocationContext } from "./Contexts";
import WELL from '../../public/data/wide_chch.json'

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

function haversine(lat1, long1, lat2, long2) {
    var R = 6371; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = long2 - long1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d
}

export default function ClosestWell(lat1, long1) {
    const [closeWells, setCloseWells] = useContext(ClosestWellContext)

    const distances = WELL.map(well => ({
        ...well,
        distance: haversine(lat1, long1, well.Latitude, well.Longitude)
    }))

    distances.sort((a, b) => a.distance - b.distance)
    setCloseWells(distances.slice(0, 6))
}
