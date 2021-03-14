import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    // 下拉框数据&异步事件
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    // 选择事件
    onSelect?: (item: DataSourceType) => void;
    // 下拉菜单自定义函数
    renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {

    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props
    // 输入框值
    const [inputValue, setInputValue] = useState(value as string)
    // 下拉框列表
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    // loading状态
    const [loading, setLoading] = useState(false)

    const [showDropdown, setShowDropdown] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    const debouncedValue = useDebounce(inputValue, 300)

    useClickOutside(componentRef, () => { setSuggestions([]) })

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            setLoading(true)
            const results = fetchSuggestions(debouncedValue)
            if (results instanceof Promise) {
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }

        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])


    // 当输入框发生变化事件
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    // 当点击下拉框item事件
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setShowDropdown(false)
                break
            default:
                break
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    // 下拉框
    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className="lim-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className="lim-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}


export default AutoComplete