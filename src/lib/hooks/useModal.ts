// import { useEffect } from 'react';

// export const useModal = () => {
//   // const dispatch = useDispatch();
//   // const { modalOn, modalProps } = useSelector(
//   //   (state: RootState) => state.modal
//   // );

//   useEffect(() => {
//     if (modalOn) {
//       document.body.style.cssText = `overflow: hidden; touch-action: none; -ms-touch-action: none;`;
//     }

//     return () => {
//       document.body.style.cssText = ``;
//       modalOn && closeModal();
//     };
//   }, [modalOn]);

//   const showModal = () => {};

//   const closeModal = () => {};

//   return {
//     modalOn,
//     showModal,
//     closeModal,
//     modalProps,
//   };
// };
