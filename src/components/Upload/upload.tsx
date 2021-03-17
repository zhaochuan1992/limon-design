import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Button from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}


export interface UploadProps {
    // 上传的URL链接
    action: string;
    defaultFileList?: UploadFile[];
    // 上传前的生命周期函数
    beforeUpload?: (file: File) => boolean | Promise<File>;
    // 上传中的生命周期函数（ percentage上传进度百分比）
    onProgress?: (percentage: number, file: File) => void
    // 上传成功生命周期函数
    onSuccess?: (data: any, file: File) => void
    // 上传失败生命周期函数
    onError?: (err: any, file: File) => void
    // 
    onChange?: (file: File) => void
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}


const Upload: FC<UploadProps> = (props) => {

    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag,
    } = props

    const fileInput = useRef<HTMLInputElement>(null)

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        // 更新单独的一个文件
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        // 点击按钮弹出文件选择
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        // 如果文件输入框为空
        if (!files) {
            return
        }
        // 上传文件
        uploadFiles(files)
        // 将输入框清空
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    // 移除文件事件
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }

    const uploadFiles = (files: FileList) => {
        // 转为数组
        let postFiles = Array.from(files)

        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }

        })
    }

    const post = (file: File) => {

        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }

        setFileList([_file, ...fileList])

        const formData = new FormData()

        formData.append(file.name, file)

        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                // 计算上传百分比
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log('percentage', percentage)
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {

            updateFileList(_file, { status: 'success', response: resp.data })

            // 上传后的回调
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {

            updateFileList(_file, { status: 'error', error: err })
            // 失败后的回调
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })

    }

    return (
        <div className="lim-upload-component">
            <div className="viking-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}>
                <Button
                    btnType="primary"
                    onClick={handleClick}
                >上传文件</Button>
                <input
                    className='lim-file-input'
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type='file'
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}


export default Upload