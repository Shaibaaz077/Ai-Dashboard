"use client"

import { useState, useCallback } from "react"
import { GeneratedItem } from "@/lib/types"

const STORAGE_KEY = "falconai_history"

const loadHistory = (): GeneratedItem[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useHistory() {

  const [history, setHistory] = useState<GeneratedItem[]>(loadHistory)

  const persist = useCallback((updated: GeneratedItem[]) => {
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }, [])

  const saveGeneration = useCallback(
    (item: Omit<GeneratedItem, "id" | "createdAt" | "saved">) => {
      const newItem: GeneratedItem = {
        ...item,
        id:        Date.now().toString(),
        createdAt: new Date().toISOString(),
        saved:     false,
      }
      const updated = [newItem, ...history].slice(0, 50)
      persist(updated)
      return newItem
    },
    [history, persist]
  )

  // Toggle save / unsave
  const toggleSave = useCallback(
    (id: string) => {
      const updated = history.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
      persist(updated)
    },
    [history, persist]
  )

  // Delete one item
  const deleteItem = useCallback(
    (id: string) => {
      const updated = history.filter((item) => item.id !== id)
      persist(updated)
    },
    [history, persist]
  )

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Derived stats
  const stats = {
    totalGenerated: history.length,
    wordsWritten:   history.reduce(
      (acc, item) => acc + item.output.split(" ").length,
      0
    ),
    savedOutputs: history.filter((item) => item.saved).length,
    savedItems:   history.filter((item) => item.saved),
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