import React from "react";
import { useState } from "react";
import image from "./icon-arrow.svg";
import estilos from "./Principal.module.css";

function Encabezado() {
  let validacion = {
    regex_day: /^(?:[1-9]|[12]\d|3[01])$/,
    regex_month: /^(?:[1-9]|1[0-2])$/,
    regex_year: /^(192[3-9]|19[3-9]\d|20[01]\d|202[0-2])$/,
  };

  const date = {
    ActualDay: new Date().getDate(),
    ActualMonth: new Date().getMonth() + 1,
    ActualYear: new Date().getFullYear(),
  };

  const [inputValue, setInputValue] = useState({
    born_day: "",
    born_month: "",
    born_year: "",
  });

  const [user_result, setUserResult] = useState({
    day: "--",
    month: "--",
    year: "--",
  });

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const calcularDatos = () => {
    let Dayresult = 0;
    let monthresult = 0;
    let YearResult = 0;

    let day = parseInt(inputValue.born_day.trim(), 10);
    let month = parseInt(inputValue.born_month.trim(), 10);

    if (validacion.regex_year.test(inputValue.born_year)) {
      YearResult = date.ActualYear - inputValue.born_year;
    }
    if (validacion.regex_month.test(inputValue.born_month)) {
      if (date.ActualMonth >= month) {
        monthresult = date.ActualMonth - month;
      } else {
        YearResult = YearResult - 1;
        monthresult = 12 + date.ActualMonth - month;
      }
    }
    if (validacion.regex_day.test(inputValue.born_day)) {
      if (date.ActualDay >= day) {
        Dayresult = date.ActualDay - day;
      } else {
        const DiasMes = new Date(
          date.ActualYear,
          date.ActualMonth,
          0
        ).getDate();
        monthresult = monthresult - 1;
        Dayresult = DiasMes - day + date.ActualDay;
      }
    }

    setUserResult({
      day: Dayresult,
      month: monthresult,
      year: YearResult,
    });
  };

  return (
    <section className={estilos.section}>
      <div id="age_form" className="">
        <form action="#" className={estilos.form}>
          <label htmlFor="born_day" className={estilos.getInfo}>
            DAY
            <input
              type="number"
              placeholder="DD"
              name="born_day"
              className={estilos.born_info}
              id="born_day"
              onChange={handleChange}
              value={inputValue.born_day}
            />
            <span className={estilos.error_empty_place}>
              This field is requiered
            </span>
          </label>
          <label htmlFor="born_month" className={estilos.getInfo}>
            MONTH
            <input
              type="number"
              placeholder="MM"
              name="born_month"
              className={estilos.born_info}
              id="born_month"
              onChange={handleChange}
              value={inputValue.born_month}
            />
            <span className={estilos.error_empty_place}>
              This field is requiered
            </span>
          </label>
          <label htmlFor="born_year" id="3" className={estilos.getInfo}>
            YEAR
            <input
              type="number"
              placeholder="YYYY"
              name="born_year"
              className={estilos.born_info}
              id="born_year"
              onChange={handleChange}
              value={inputValue.born_year}
            />
            <span className={estilos.error_empty_place}>
              This field is requiered
            </span>
          </label>
        </form>
        <hr className={estilos.hr} />
        <div id="button_send" className={estilos.button_container}>
          <button
            type="submit"
            className={estilos.button}
            onClick={calcularDatos}
          >
            <img src={image} alt="icon-arrow" className={estilos.arrow} />
          </button>
        </div>
      </div>
      <div id="user_results" className=" h-[230px]">
        <div className="flex">
          <p className={estilos.age_result} id="user_year_result">
            {user_result.year}
          </p>
          <p className={estilos.detail}> years</p>
        </div>
        <div className="flex">
          <p className={estilos.age_result} id="user_month_result">
            {user_result.month}
          </p>
          <p className={estilos.detail}> months</p>
        </div>
        <div className="flex">
          <p className={estilos.age_result} id="user_day_result">
            {user_result.day}
          </p>
          <p className={estilos.detail}> days</p>
        </div>
      </div>
    </section>
  );
}

export default Encabezado;
