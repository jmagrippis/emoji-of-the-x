export type Json = string | number | boolean | null | {[key: string]: Json} | Json[]

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			graphql: {
				Args: {
					operationName?: string
					query?: string
					variables?: Json
					extensions?: Json
				}
				Returns: Json
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	public: {
		Tables: {
			advice: {
				Row: {
					art_prompt: string | null
					character_id: string
					content: string
					created_at: string | null
					emoji_code: string
					id: string
					type: string
				}
				Insert: {
					art_prompt?: string | null
					character_id: string
					content: string
					created_at?: string | null
					emoji_code: string
					id?: string
					type: string
				}
				Update: {
					art_prompt?: string | null
					character_id?: string
					content?: string
					created_at?: string | null
					emoji_code?: string
					id?: string
					type?: string
				}
			}
			characters: {
				Row: {
					created_at: string | null
					franchise: string
					id: string
					name: string
					title: string
				}
				Insert: {
					created_at?: string | null
					franchise: string
					id?: string
					name: string
					title: string
				}
				Update: {
					created_at?: string | null
					franchise?: string
					id?: string
					name?: string
					title?: string
				}
			}
			content_types: {
				Row: {
					created_at: string | null
					id: string
				}
				Insert: {
					created_at?: string | null
					id: string
				}
				Update: {
					created_at?: string | null
					id?: string
				}
			}
			emojis: {
				Row: {
					character: string
					code: string
					created_at: string | null
					hidden: boolean
					name: string
				}
				Insert: {
					character: string
					code: string
					created_at?: string | null
					hidden?: boolean
					name: string
				}
				Update: {
					character?: string
					code?: string
					created_at?: string | null
					hidden?: boolean
					name?: string
				}
			}
			picks: {
				Row: {
					created_at: string
					emoji_code: string
					id: string
				}
				Insert: {
					created_at: string
					emoji_code: string
					id?: string
				}
				Update: {
					created_at?: string
					emoji_code?: string
					id?: string
				}
			}
			quotes: {
				Row: {
					character_id: string
					content: string
					created_at: string
					emoji_code: string
					id: string
				}
				Insert: {
					character_id: string
					content: string
					created_at?: string
					emoji_code: string
					id?: string
				}
				Update: {
					character_id?: string
					content?: string
					created_at?: string
					emoji_code?: string
					id?: string
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			random_character: {
				Args: Record<PropertyKey, never>
				Returns: {
					created_at: string | null
					franchise: string
					id: string
					name: string
					title: string
				}[]
			}
			random_emoji: {
				Args: Record<PropertyKey, never>
				Returns: {
					character: string
					code: string
					created_at: string | null
					hidden: boolean
					name: string
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null
					avif_autodetection: boolean | null
					created_at: string | null
					file_size_limit: number | null
					id: string
					name: string
					owner: string | null
					public: boolean | null
					updated_at: string | null
				}
				Insert: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id: string
					name: string
					owner?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
				Update: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id?: string
					name?: string
					owner?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
			}
			migrations: {
				Row: {
					executed_at: string | null
					hash: string
					id: number
					name: string
				}
				Insert: {
					executed_at?: string | null
					hash: string
					id: number
					name: string
				}
				Update: {
					executed_at?: string | null
					hash?: string
					id?: number
					name?: string
				}
			}
			objects: {
				Row: {
					bucket_id: string | null
					created_at: string | null
					id: string
					last_accessed_at: string | null
					metadata: Json | null
					name: string | null
					owner: string | null
					path_tokens: string[] | null
					updated_at: string | null
				}
				Insert: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
				}
				Update: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			extension: {
				Args: {
					name: string
				}
				Returns: string
			}
			filename: {
				Args: {
					name: string
				}
				Returns: string
			}
			foldername: {
				Args: {
					name: string
				}
				Returns: string[]
			}
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>
				Returns: {
					size: number
					bucket_id: string
				}[]
			}
			search: {
				Args: {
					prefix: string
					bucketname: string
					limits?: number
					levels?: number
					offsets?: number
					search?: string
					sortcolumn?: string
					sortorder?: string
				}
				Returns: {
					name: string
					id: string
					updated_at: string
					created_at: string
					last_accessed_at: string
					metadata: Json
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
