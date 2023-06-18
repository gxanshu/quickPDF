import { Editor } from "grapesjs";
import html2canvas from 'html2canvas';
import {onSubmit} from "./function"

export default function customSaveModal(editor: Editor) {
  const selectedComponent = editor.getSelected();
  // Get the Modal module
  const modal = editor.Modal;

  // Define the content of the modal
  // Define the content of the modal
  const content = `
                <div class="modal">
                <div class="modal-content">
                  <div>
                    <p>Details</p>
                    <div class="container form-row">
                      <input class="form-column" type="text" id="component-name" name="component-name" placeholder="name">
                      <input class="form-column" type="text" id="component-category" name="component-category" placeholder="category">
                    </div>
                    <div class="container image-container">
                      <div id="screenShotCanvas"/>
                    </div>
                    <div class="container button-container">
                      <button id="submit" class="button save-button">Save</button>
                      <button id="reset" class="button reset-button">Reset</button>
                    </div>
                  </div>
                </div>
              </div>                       
`;

  // Create the modal
  const myModal = modal.open({
    content,
    title: 'Save',
    width: '400px',
    height: 'auto',
    closedOnEscape: true,
    closedOnClickOutside: true,
  });



  /* functioning of modal */
  html2canvas(selectedComponent?.getEl() as HTMLElement).then(function (canvas) {
    document.getElementById("screenShotCanvas")?.appendChild(canvas);
  });
  
  // onsaving function
  

  document.getElementById("submit")?.addEventListener("click", ()=> {
   let nameBlock = document.getElementById("component-name") as HTMLInputElement
   let categoryBlock = document.getElementById("component-category") as HTMLInputElement

    let details = {
      name: nameBlock.value,
      category: categoryBlock.value
    }

    onSubmit(selectedComponent, editor, details, myModal)
  })

  return myModal
}