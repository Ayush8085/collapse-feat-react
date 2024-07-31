import { useState } from "react"
import { FaFolderClosed } from "react-icons/fa6";
import { FaFile, FaChevronRight } from "react-icons/fa";

type Folder = {
  name: string,
  folders?: Folder[]
}

const folders: Folder[] = [
  {
    name: 'Home',
    folders: [
      {
        name: 'Movies',
        folders: [{
          name: 'Action',
          folders: [{ name: '2000s', folders: [] }, { name: '2010s', folders: [] }, { name: 'Gladiator.mp4' }]
        }, {
          name: 'Comedy',
          folders: [{ name: 'Popular', folders: [] }]
        }]
      },
      {
        name: 'Music',
        folders: [{ name: 'Party', folders: [] }, { name: 'Romantic', folders: [] }]
      },
      { name: 'Pictures', folders: [] },
      { name: 'Documents', folders: [] },
      { name: 'password.txt' },
    ]
  },
]

// ---------- MAIN APP --------
function App() {
  return (
    <div className="w-screen h-screen m-20">
      <ul>
        {folders.map((folder) => (
          <Folder folder={folder} key={folder.name} />
        ))}
      </ul>
    </div>
  )
}

// ----------- FOLDER COMPONENT ---------------
function Folder({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ------------ RECURSION CALL ON FOLDERS ------------
    <li className="my-1.5" key={folder.name}>
      <span className="flex items-center gap-1.5">
        {folder.folders && folder.folders.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaChevronRight className={`w-3 ${isOpen ? 'rotate-90' : ''}`} />
          </button>
        )}
        {folder.folders ? (
          <FaFolderClosed className={`w-6 text-sky-700 ${folder.folders.length === 0 ? 'ml-5' : ''}`} />
        ) : (
          <FaFile className="w-6 ml-5" />
        )}
        {folder.name}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {folder.folders?.map((folder) => (
            <Folder folder={folder} key={folder.name} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default App
