import { useState } from "react"
import MyModal from "./myModal"

export default function Here() {
  const [open, setOpen] = useState(false)
  return (
    <main className="App">
      <button className="btn btn-danger" onClick={() => setOpen(true)}>
         Delete
      </button>

      <MyModal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </MyModal>
    </main>
  )
}