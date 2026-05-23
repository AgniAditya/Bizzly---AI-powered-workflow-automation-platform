
function UserPrompt({ text }: { text: string }) {
  return (
    <div className="w-full h-fit justify-end flex">
      <div className="bg-[#333] text-white text-xl p-2 rounded-lg">
        <p className="text-sm font-medium mb-1">You:</p>
        {text}
      </div>
    </div>
  )
}

export default UserPrompt