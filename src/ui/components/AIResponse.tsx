
function AIResponse({ text }: { text: string }) {
  return (
    <div className="w-full h-fit justify-start flex">
      <div className="bg-[#333] text-white text-xl p-2 rounded-lg">
        <p className="text-sm font-medium mb-1">AI:</p>
        {text}
      </div>
    </div>
  )
}

export default AIResponse