import { createContext, useState } from 'react';

const NoteFormContext = createContext({});

export const NoteFormContextProvider = (props) => {
  const [addFormType, setAddFormType] = useState(true);
  const [currentEditNote, setCurrentEditNote] = useState(null);

  const changeToEditForm = () => {
    setAddFormType(false);
  };

  const changeToAddForm = () => {
    setAddFormType(true);
  };

  return (
    <NoteFormContext.Provider value={{ addFormType, changeToEditForm, changeToAddForm, currentEditNote, setCurrentEditNote }}>
      {props.children}
    </NoteFormContext.Provider>
  );
};

export default NoteFormContext;
