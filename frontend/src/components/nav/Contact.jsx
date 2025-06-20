import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { COUNTRIES } from "../../constants/countries";
import { postContact } from "../data/Api";
import { useDataStore } from "./store";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border-1 rounded px-1 bg-white"
        autoComplete="on"
      />
      {error && (
        <span id={`${name}-error`} className="text-red-600">
          *{error}
        </span>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

const initialFormData = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  subject: "",
  message: "",
};

export const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { setData } = useDataStore();

  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("contactFormData");
    savedFormData && setFormData(JSON.parse(savedFormData));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    console.table(formData);
    const results = await postContact(formData);
    results && setData(formData);
    // what to do with data

    // clean state update
    setFormData((prevFormData) => {
      return Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
    });
  };

  // update target input
  const onChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fillData = () => {
    setFormData({
      fname: "Cyb",
      lname: "Snoob",
      email: "trading@gmail.com",
      phone: "085963148",
      company: "tradingeconomics",
      country: "Sweden",
      subject: "trading",
      message: "Testing",
    });
  };

  // const buttonClass = "w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 my-3";

  const buttonClass =
    "w-full text-default-txtcolor bg-default font-medium my-4 py-2 rounded hover:bg-gray-800 hover:text-default-txtcolor";

  return (
    <section className="flex flex-col gap-y-6 my-6 px-4 bg-[#fafafa]">
      <div className="flex justify-between">
        <h1 className="uppercase font-bold text-xl">
          Contact Form (DOESNT WORK YET)
        </h1>
        <button
          onClick={fillData}
          className="bg-orange-400 px-2 rounded hover:cursor-pointer"
        >
          FILL IN TEST DATA
        </button>
      </div>

      <form onSubmit={submit}>
        <fieldset>
          <InputField
            label="First Name"
            name="fname"
            value={formData.fname}
            onChange={onChange}
            required={true}
          />
          <InputField
            label="Last Name"
            name="lname"
            value={formData.lname}
            onChange={onChange}
            required={true}
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required={true}
          />
          <InputField
            type="tel"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required={true}
          />
          <InputField
            type="text"
            label="Company"
            name="company"
            value={formData.company}
            onChange={onChange}
            required={true}
          />
          <div className="flex flex-col">
            <label htmlFor="countries" className="font-semibold">
              Country
            </label>
            <input
              id="countries"
              list="country-list"
              name="country"
              value={formData.country}
              placeholder="Select Country"
              className="border-1 rounded px-1"
              onChange={onChange}
            />
            <datalist id="country-list">
              {COUNTRIES.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </div>
          <InputField
            type="text"
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={onChange}
            required={true}
          />
          <div className="flex flex-col">
            <label htmlFor="message" className="font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onChange}
              className="bg-white border-1 rounded h-40"
              required
            >
              test
            </textarea>
          </div>
        </fieldset>
        <button className={buttonClass} type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};
