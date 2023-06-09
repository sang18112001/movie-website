import { getTime } from '../../utils/utils.js';
import getAPI from '../../api/api.js';

const commentDeletion = (movie_id) => {
  const personalCmts = document.querySelectorAll('.comment-personal');

  personalCmts.forEach((personalCmt) => {
    const deleteBtn = personalCmt.querySelector('.comment-delete');

    const handleDeleteClick = (event) => {
      getAPI.getInfoComments(movie_id).then((listCmt) => {
        const deleteId = Object.keys(listCmt).find((key) => listCmt[key].idCmt == personalCmt.id);
        delete listCmt[deleteId];
        personalCmt.style.display = 'none';
        getAPI.deleteComment(movie_id, deleteId);
      });
    };

    deleteBtn.addEventListener('click', handleDeleteClick);
  });
};

const commentEdition = (movie_id) => {
  const personalCmts = document.querySelectorAll('.comment-personal');
  personalCmts.forEach((personalCmt) => {
    const editBtn = personalCmt.querySelector('.comment-edit');
    const editCurrentText = personalCmt.querySelector('.comment-text');
    const editCurrentTime = personalCmt.querySelector('.comment-time');
    const editForm = personalCmt.querySelector('form');
    const editInput = editForm.querySelector('input');
    const handleEditSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(editForm);
      const editCmt = Object.fromEntries(formData).edit;
      const editTime = getTime();

      editCurrentText.classList.toggle('active-hidden');;
      editCurrentText.innerHTML = editCmt;
      editCurrentTime.innerHTML = `Updated at: ${editTime}`;

      getAPI.getInfoComments(movie_id).then((listCmt) => {
        const editId = Object.keys(listCmt).find((key) => listCmt[key].idCmt == personalCmt.id);
        const editValue = listCmt[editId];
        editValue.content = editCmt;
        editValue.time = editTime;
        getAPI.editComment(movie_id, editId, editValue);
      });

      editForm.classList.toggle('active-hidden');
    };

    editBtn.addEventListener('click', (event) => {
      editCurrentText.classList.toggle('active-hidden');;
      editForm.classList.toggle('active-hidden');
      editInput.value = editCurrentText.innerHTML
      editForm.addEventListener('submit', handleEditSubmit);
    });
  });
};

export default (movie_id) => {
  commentDeletion(movie_id);
  commentEdition(movie_id);
};
