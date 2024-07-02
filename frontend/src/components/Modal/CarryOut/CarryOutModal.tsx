import { useContext, useEffect, useMemo, useState } from "react";
import Heading from "../../Heading/Heading";
import "./CarryOutModal.css";
import { OrderContext } from "../../../context/OrderContext";
import CarryOutMap from "../../Map/CarryOutMap";
import { ModalContext } from "../../../context/ModalContext";
import { useNavigate } from "react-router-dom";

interface Store {
  city: string;
  name: string;
  coords: [number, number];
}

const CarryOutModal = () => {
  const [selectedStore, setSelectedStore] = useState("Burgas - Central Park");
  const [storeCoords, setStoreCoords] = useState<[number, number]>([0, 0]);

  const { isOpenForDelivery, setOrderType, setActiveOrder, orderStore, setOrderStore, setOrderTime, orderTime } =
    useContext(OrderContext);
  const { setOpenModal, setModalType, setProduct } = useContext(ModalContext);

  const navigate = useNavigate();

  const pizzaPlaces = useMemo<Store[]>(
    () => [
      { city: "Burgas", name: "Central Park", coords: [42.51089388389011, 27.459558977955] },
      { city: "Varna", name: "Levski", coords: [43.22053134874774, 27.936221790277145] },
      { city: "Varna", name: "Planet Mall", coords: [43.226922191205205, 27.875809240006603] },
      { city: "Varna", name: "Center", coords: [43.20767922172417, 27.91024889901246] },
      { city: "Pernik", name: "Plaza", coords: [42.60759760118098, 23.056313668009725] },
      { city: "Plovdiv", name: "Kurshiqka", coords: [42.15767615405462, 24.748879265991413] },
      { city: "Plovdiv", name: "Kuchuk Paris", coords: [42.12323160840309, 24.740547407743826] },
      { city: "Plovdiv", name: "Trakia", coords: [42.13912068243967, 24.787930029270758] },
      { city: "Plovdiv", name: "Central", coords: [42.141541395150014, 24.73978282357347] },
      { city: "Sofia", name: "Borovo", coords: [42.67288111390348, 23.285597124501713] },
      { city: "Sofia", name: "Vapcarov", coords: [42.665656646806696, 23.31917340162371] },
      { city: "Sofia", name: "Geo Milev", coords: [42.68017305816299, 23.356960627843282] },
      { city: "Sofia", name: "Drujba", coords: [42.65199558435452, 23.404189032234743] },
      { city: "Sofia", name: "Kostenski Vodopad", coords: [42.665492099877156, 23.298831890710577] },
      { city: "Sofia", name: "Krasna Polqna", coords: [42.695285285080416, 23.285756645310702] },
      { city: "Sofia", name: "Lulin", coords: [42.71311286172058, 23.24881043552756] },
      { city: "Sofia", name: "Lulin Orion", coords: [42.717106117450754, 23.27786330074529] },
      { city: "Sofia", name: "Mladost", coords: [42.63624926620774, 23.36986941582712] },
      { city: "Sofia", name: "Mladost 1", coords: [42.65545395667885, 23.38126505178002] },
      { city: "Sofia", name: "Musagenica", coords: [42.661704719474585, 23.360259616277883] },
      { city: "Sofia", name: "Nadejda", coords: [42.734370008265664, 23.29424143658992] },
      { city: "Sofia", name: "Ovha Kupel", coords: [42.68647108356929, 23.24658131282099] },
      { city: "Sofia", name: "Pavlovo", coords: [42.66163946901486, 23.26496665315077] },
      { city: "Sofia", name: "Studentski Grad", coords: [42.65383864126901, 23.345949108011933] },
      { city: "Sofia", name: "Studentski Grad 2", coords: [42.64302843701166, 23.344085738494325] },
      { city: "Sofia", name: "Suhata Reka", coords: [42.70381095804067, 23.356406005394835] },
      { city: "Sofia", name: "Center", coords: [42.697305382909974, 23.31709375748052] },
      { city: "Sofia", name: "South Park", coords: [42.67440903299069, 23.30941316832158] },
    ],
    []
  );

  useEffect(() => {
    const newSelectedStore = selectedStore.split(" - ");
    const newCity = newSelectedStore[0];
    const newPlace = newSelectedStore[1];

    pizzaPlaces.forEach((place) => {
      if (place.city === newCity && place.name === newPlace) {
        setStoreCoords(place.coords);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore]);

  useEffect(() => {
    setOrderStore(selectedStore);
  }, [selectedStore, setOrderStore]);

  const deliveryHoursOpenedStore = [
    isOpenForDelivery ? "NOW" : "11:30",
    "11:40",
    "11:50",
    "12:00",
    "12:10",
    "12:20",
    "12:30",
    "12:40",
    "12:50",
    "13:00",
    "13:10",
    "13:20",
    "13:30",
    "13:40",
    "13:50",
    "14:00",
    "14:10",
    "14:20",
    "14:30",
    "14:40",
    "14:50",
    "15:00",
    "15:10",
    "15:20",
    "15:30",
    "15:40",
    "15:50",
    "16:00",
    "16:10",
    "16:20",
    "16:30",
    "16:40",
    "16:50",
    "17:00",
    "17:10",
    "17:20",
    "17:30",
    "17:40",
    "17:50",
    "18:00",
    "18:10",
    "18:20",
    "18:30",
    "18:40",
    "18:50",
    "19:00",
    "19:10",
    "19:20",
    "19:30",
    "19:40",
    "19:50",
    "20:00",
    "20:10",
    "20:20",
    "20:30",
    "20:40",
    "20:50",
    "21:00",
    "21:10",
    "21:20",
    "21:30",
    "21:40",
    "21:50",
    "22:00",
    "22:10",
    "22:20",
    "22:30",
  ];

  useEffect(() => {
    setOrderTime(deliveryHoursOpenedStore[0]);
  }, []);

  const deliveryHoursOpen = deliveryHoursOpenedStore
    .map((hour) => {
      if (hour !== "NOW") {
        const h = parseInt(hour.split(":")[0]);
        const m = parseInt(hour.split(":")[1]);

        const dateForDelivery = new Date(new Date(new Date(new Date().setHours(h)).setMinutes(m)).setSeconds(0));

        const now = new Date();

        if (dateForDelivery.getTime() < new Date(now.getTime()).setMinutes(now.getMinutes() + 20)) {
          return undefined;
        } else {
          return String(
            `${dateForDelivery.getHours()}:${
              String(dateForDelivery.getMinutes()).length === 1 ? "00" : dateForDelivery.getMinutes()
            }`
          );
        }
      } else {
        return "NOW";
      }
    })
    .filter((hour) => hour !== undefined);

  useEffect(() => {
    if (isOpenForDelivery && deliveryHoursOpen[0]) {
      setOrderTime(deliveryHoursOpen[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenForDelivery]);

  const handleOrder = () => {
    setOrderType("carry-out");
    setActiveOrder(true);
    navigate(`/menu/${orderStore.toLocaleLowerCase().split(" ").join("")}/pizza`);
    setOpenModal(false);
    setProduct([]); // if there is an active product the modal will be open, so it needs to be nullified before entering the menu page
    setModalType("");
    localStorage.setItem("active-order", "true");
    localStorage.setItem("order-time", String(orderTime));
    localStorage.setItem(
      "order-details",
      JSON.stringify({
        type: "carryOut",
        store: orderStore,
      })
    );
  };

  return (
    <div>
      <Heading text="SELECT STORE & PICK-UP TIME" />

      <div className="com-address">
        <p>STORE</p>
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
          {pizzaPlaces.map((place) => (
            <option key={`${place.coords}`}>
              {place.city} - {place.name}
            </option>
          ))}
        </select>
      </div>

      <div className="com-store-order-time">
        <p>PICK-UP TIME</p>
        <select onChange={(e) => setOrderTime(e.target.value)} value={orderTime}>
          {deliveryHoursOpen.map((hour, i) => (
            <option key={i}>{hour}</option>
          ))}
        </select>
      </div>

      <div className="com-map">
        <CarryOutMap coords={storeCoords} />
      </div>

      <div className={`com-order-btn `} onClick={handleOrder}>
        ORDER NOW!
      </div>
    </div>
  );
};

export default CarryOutModal;
