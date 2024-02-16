const AssignmentMark = () => {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-full px-5 lg:px-20">
        <div class="px-3 py-20 bg-opacity-10">
          <ul class="assignment-status">
            <li>
              Total <span>4</span>
            </li>
            <li>
              Pending <span>3</span>
            </li>
            <li>
              Mark Sent <span>1</span>
            </li>
          </ul>
          <div class="overflow-x-auto mt-4">
            <table class="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th class="table-th">Assignment</th>
                  <th class="table-th">Date</th>
                  <th class="table-th">Student Name</th>
                  <th class="table-th">Repo Link</th>
                  <th class="table-th">Mark</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-600/50">
                <tr>
                  <td class="table-td">
                    Assignment 1 - Implement Debounce Function
                  </td>
                  <td class="table-td">10 Mar 2023 10:58:13 PM</td>
                  <td class="table-td">Saad Hasan</td>
                  <td class="table-td">
                    https://github.com/Learn-with-Sumit/assignment-1
                  </td>
                  <td class="table-td input-mark">
                    <input max="100" value="100" />
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td class="table-td">
                    Assignment 2 - Implement Best Practices
                  </td>
                  <td class="table-td">10 Mar 2023 10:58:13 PM</td>
                  <td class="table-td">Akash Ahmed</td>
                  <td class="table-td">
                    https://github.com/Learn-with-Sumit/assignment-1
                  </td>
                  <td class="table-td">50</td>
                </tr>
                <tr>
                  <td class="table-td">
                    Assignment 1 - Scoreboard Application
                  </td>
                  <td class="table-td">10 Mar 2023 10:58:13 PM</td>
                  <td class="table-td">Ferdous</td>
                  <td class="table-td">
                    https://github.com/Learn-with-Sumit/assignment-1
                  </td>
                  <td class="table-td">100</td>
                </tr>

                <tr>
                  <td class="table-td">
                    Assignment 1 - Scoreboard Application
                  </td>
                  <td class="table-td">10 Mar 2023 10:58:13 PM</td>
                  <td class="table-td">Saad Hasan</td>
                  <td class="table-td">
                    https://github.com/Learn-with-Sumit/assignment-1
                  </td>
                  <td class="table-td">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentMark;
