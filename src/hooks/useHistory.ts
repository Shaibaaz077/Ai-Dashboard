"use client"

import { useState, useEffect } from "react"
import { GeneratedItem } from "@/lib/types"


const STORAGE_KEY = "nexusai_history"

export function useHistory() {

  const [history, setHistory] = useState<GeneratedItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  // Save a new generation
  const saveGeneration = (item: Omit<GeneratedItem, "id" | "createdAt" | "saved">) => {
    const newItem: GeneratedItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      saved: false,
    }
    const updated = [newItem, ...history].slice(0, 50)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newItem
  }

  // Toggle save/unsave
  const toggleSave = (id: string) => {
    const updated = history.map((item) =>
      item.id === id ? { ...item, saved: !item.saved } : item
    )
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  // Delete one item
  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  // Clear all history
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }

  // Derived data for Home tab stats
  const stats = {
    totalGenerated: history.length,
    wordsWritten: history.reduce(
      (acc, item) => acc + item.output.split(" ").length, 0
    ),
    savedOutputs: history.filter((item) => item.saved).length,
    savedItems: history.filter((item) => item.saved),
  }

  return {
    history,
    stats,
    saveGeneration,
    toggleSave,
    deleteItem,
    clearHistory,
  }
}