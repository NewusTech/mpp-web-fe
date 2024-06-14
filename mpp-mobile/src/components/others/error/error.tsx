export default function Error({ error }: any) {
  const err = error?.errors?.map((el: any) => {
    return el;
  });

  console.log(error, "===");

  console.log(err, "???");

  return (
    <p className="animate-pulse rounded bg-red-400 px-4 py-2 text-center text-white">
      {err.message}
    </p>
  );
}

// export const toasts = toast("My toast", {
//   className: "my-classname",
//   description: "My description",
//   duration: 5000,
//   icon: <InfoIcon />,
// });
