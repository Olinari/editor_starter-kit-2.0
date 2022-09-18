class ReceiptsManager {
   constructor() {}
   getAllReceipts() {
      const allReceipts = {};
      const response = fetch('./getAllReceipts', {
         method: 'GET',
      }).then((res) =>
         res
            .json()
            .then(
               (data) => (allReceipts.data = JSON.parse(data.body).documents)
            )
      );
      return response;
   }

   createReceiptsTable(data) {
      console.table(data[1]);
      const body = document.querySelector('body');
      const oldTable = document.querySelector('#rTable');
      oldTable?.remove();
      body.insertAdjacentHTML(
         'beforeend',
         `<table id="rTable" class="styled-table">
         <thead>
         <th>category</th>
         <th>subtotal</th>
         <th>currency</th>
         <th>date</th>
         </thead>
         <tbody>
         ${data.map(
            (row) => `<tr>
         <td>${row.category}</td>
         <td>${row.subtotal}</td>
         <td>${row.currency_code}</td>
         <td>${row.date}</td>
         <td><img width="30" src="${row.img_url}"></td>
         </tr>`
         )}
         </tbody>
         </table>`
      );
   }
}

(function app() {
   const receiptsManager = new ReceiptsManager();
   const allReceipts = receiptsManager.getAllReceipts();
   allReceipts.then((data) => receiptsManager.createReceiptsTable(data));

   document.querySelector('#submit').onclick = () => {
      app();
   };
})();
