// import { useForm, SubmitHandler } from "react-hook-form";

// interface FormInput {
//   "Förnamn / smeknamn": string;
//   Kön: "Pojke" | "Flicka" | "Binär";
//   Födelsedatum: number;
// }

// export default function ChildData(): React.FC {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormInput>();
//   const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
//   console.log(errors);

//   return (
//     <form className="column" onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="text"
//         placeholder="Förnamn / smeknamn"
//         {...register("Förnamn / smeknamn", { required: true })}
//       />
//       <select {...register("Kön")}>
//         <option value="Pojke">Pojke</option>
//         <option value=" Flicka"> Flicka</option>
//         <option value=" Binär"> Binär</option>
//       </select>
//       <input
//         type="number"
//         placeholder="Födelsedatum"
//         {...register("Födelsedatum", {})}
//       />

//       <input type="submit" />
//     </form>
//   );
// }

import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
  "Förnamn / smeknamn": string;
  Kön: "Pojke" | "Flicka" | "Binär";
  Födelsedatum: number;
}

const ChildData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
  console.log(errors);

  return (
    <form className="column" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Förnamn / smeknamn"
        {...register("Förnamn / smeknamn", { required: true })}
      />
      <select {...register("Kön")}>
        <option value="Pojke">Pojke</option>
        <option value="Flicka">Flicka</option>
        <option value="Binär">Binär</option>
      </select>
      <input
        type="number"
        placeholder="Födelsedatum"
        {...register("Födelsedatum", {})}
      />

      <input type="submit" />
    </form>
  );
};

export default ChildData;
