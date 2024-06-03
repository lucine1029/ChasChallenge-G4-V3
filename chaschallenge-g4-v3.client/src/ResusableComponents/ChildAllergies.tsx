// import { useForm } from "react-hook-form";

// // Define the structure of a single allergy
// interface Allergies {
//   allergen: string;
//   isSelected: boolean;
// }

// // Define the structure of the form's data
// interface FormInputs {
//   [key: string]: boolean;
// }

// const allergies: Allergies[] = [
//   { allergen: "Celiaki/gluten", isSelected: false },
//   { allergen: "Fisk", isSelected: false },
//   { allergen: "Jordnötter", isSelected: false },
//   { allergen: "Laktos", isSelected: false },
//   { allergen: "Lupin", isSelected: false },
//   { allergen: "Mjölprotein", isSelected: false },
//   { allergen: "Nötter och Mandel", isSelected: false },
//   { allergen: "Selleri", isSelected: false },
//   { allergen: "Senap", isSelected: false },
//   { allergen: "Sesamfrö och övriga fröer", isSelected: false },
//   { allergen: "Skaldjur", isSelected: false },
//   { allergen: "Soja", isSelected: false },
//   { allergen: "Sulfiter", isSelected: false },
//   { allergen: "Tillsatser", isSelected: false },
//   { allergen: "Vete/Spannmål", isSelected: false },
//   { allergen: "Ägg", isSelected: false },
// ];

// export default function AllergiesComp(): React.FC {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<FormInputs>({
//     defaultValues: allergies.reduce((acc: FormInputs, allergen: Allergies) => {
//       acc[allergen.allergen] = allergen.isSelected;
//       return acc;
//     }, {}),
//   });
//   //const onSubmit = (data) => console.log(data);
//   console.log(errors);

//   // Handle checkbox changes
//   const handleCheckboxChange = (allergen: string) => {
//     const newValue = !watch(allergen);
//     setValue(allergen, newValue);
//     console.log(allergen, newValue);
//   };

//   return (
//     <div>
//       <form>
//         {allergies.map((allergen, index) => (
//           <div key={index}>
//             <label>
//               <input
//                 type="checkbox"
//                 {...register(allergen.allergen)}
//                 checked={watch(allergen.allergen)}
//                 onChange={() => handleCheckboxChange(allergen.allergen)}
//               />
//               {allergen.allergen}
//             </label>
//           </div>
//         ))}
//       </form>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";

// Define the structure of a single allergy
interface Allergies {
  allergen: string;
  isSelected: boolean;
}

// Define the structure of the form's data
interface FormInputs {
  [key: string]: boolean;
}

const allergies: Allergies[] = [
  { allergen: "Celiaki/gluten", isSelected: false },
  { allergen: "Fisk", isSelected: false },
  { allergen: "Jordnötter", isSelected: false },
  { allergen: "Laktos", isSelected: false },
  { allergen: "Lupin", isSelected: false },
  { allergen: "Mjölprotein", isSelected: false },
  { allergen: "Nötter och Mandel", isSelected: false },
  { allergen: "Selleri", isSelected: false },
  { allergen: "Senap", isSelected: false },
  { allergen: "Sesamfrö och övriga fröer", isSelected: false },
  { allergen: "Skaldjur", isSelected: false },
  { allergen: "Soja", isSelected: false },
  { allergen: "Sulfiter", isSelected: false },
  { allergen: "Tillsatser", isSelected: false },
  { allergen: "Vete/Spannmål", isSelected: false },
  { allergen: "Ägg", isSelected: false },
];

const AllergiesComp = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: allergies.reduce((acc: FormInputs, allergen: Allergies) => {
      acc[allergen.allergen] = allergen.isSelected;
      return acc;
    }, {}),
  });
  //const onSubmit = (data) => console.log(data);
  console.log(errors);

  // Handle checkbox changes
  const handleCheckboxChange = (allergen: string) => {
    const newValue = !watch(allergen);
    setValue(allergen, newValue);
    console.log(allergen, newValue);
  };

  return (
    <div>
      <form>
        {allergies.map((allergen, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                {...register(allergen.allergen)}
                checked={watch(allergen.allergen)}
                onChange={() => handleCheckboxChange(allergen.allergen)}
              />
              {allergen.allergen}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default AllergiesComp;
