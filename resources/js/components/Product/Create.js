import React, { useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom';
import ProductVariantServices from '../../services/ProductVariantServices';

import Select from 'react-select';

const Create = () => {
    const [state, setState] = useReducer(
        (state, setState) => ({ ...state, ...setState }), {
        name: '',
        sku: '',
        description: '',
        image: '',
        variants: {},
        combineVariants: {}
    })

    useEffect(() => {
        getVariants();

        // const array1 = [{ id: 1, id: 2 }]
        // const array2 = [{ id: 3, id: 4 }]
        // array1.map(v=>array2.map())
    }, [])
    const getVariants = async () => {
        const variantList = await ProductVariantServices.list();
        const svariantArr = []
        variantList.map(variant => svariantArr.push({
            id: variant.id,
            title: variant.title,
            variantData: variant.variantData,
            oldVariants: variant.variantData,
            selectedVariants: Array()
        }))
        setState({
            ...state, variants: svariantArr
        })
    }

    const handleInputChange = (event) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? (target.checked ? target.value : 0) : target.value;
        const name = target.name;
        if (name == 'file') {
            value = target.files[0];
        }
        setState({
            ...state,
            [name]: value
        });
    }

    const handleVariantChange = (event, svariant) => {
        const Color = [], Size = [], Style = [], vdata = state.variants, oldVariant = [], combineArr = [];
        vdata.map(variant => {
            if (variant.id === svariant.id) {
                let selectedVariant = variant.selectedVariants
                Object.keys(variant.variantData)
                    .map((key) => {
                        if (variant.variantData[key].id == event.target.value) selectedVariant.push(variant.variantData[key])
                    })
                Object.keys(variant.oldVariants)
                    .map((key) => {
                        if (variant.oldVariants[key].id != event.target.value) oldVariant.push(variant.oldVariants[key])
                    })
                variant.selectedVariants = selectedVariant
                variant.oldVariants = oldVariant
            }
            if (svariant.title == "Color") {
                Object.keys(variant.selectedVariants)
                    .map(key)
            }


        })
        // const Grape = state.variants.

        console.log(`${Color}: ${Size} :${Style}`)
        // Object.keys(variant.selectedVariants)
        //     .map((key) => {
        //         if (variant.selectedVariants.length > 0) {

        //         }
        //     })
        // )
        setState({ ...state, variants: vdata })
    }

    const removeVariant = (event, id) => {
        const vdata = state.variants;
        vdata.map(variant => {
            let oldVariant = variant.oldVariants;
            let selectedVariant = []
            if (variant.id === id) {
                Object.keys(variant.selectedVariants)
                    .map((key) => {
                        if (variant.selectedVariants[key].id != event.id) selectedVariant.push(variant.selectedVariants[key])
                    })
                console.log(`variant.oldVariants`, variant.oldVariants)
                Object.keys(variant.oldVariants)
                    .map((key) => {
                        if (variant.oldVariants[key].id != event.id) oldVariant.push(event)
                    })
                variant.selectedVariants = selectedVariant
                variant.oldVariants = oldVariant.filter((item, index) => oldVariant.indexOf(item) == index)
            }
        })
        setState({ ...state, variants: vdata })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`state ::: > `, state)
    }

    let variantList = null;

    if (state.variants.length > 0) {
        variantList = state.variants.map(variant => (
            <div className="row" key={ variant.id }>
                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="">Option</label>
                        <select className="form-control" name="selectedVariants" onChange={ (e) => handleVariantChange(e, variant) }>
                            <option>{ variant.title }</option>
                            {
                                Object.keys(variant.oldVariants).map(function (key) {
                                    return <option value={ variant.oldVariants[key].id } key={ variant.oldVariants[key].id }>
                                        { variant.oldVariants[key].variant }
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="">
                        <div className="variant border rounded d-flex">
                            <div className=" py-1">
                                <div className="text-white">.</div>
                            </div>
                            { variant.selectedVariants.map(vdata => {
                                return <div className="ml-1 py-1" key={ vdata.id }>
                                    <div className="pl-1 variant-btn">{ vdata.variant }<button onClick={ () => removeVariant(vdata, variant.id) } className="variant-btn variant-btn-success px-2">x</button></div>
                                </div>
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    let variantListPrice = null

    if (state.variants.length > 0) {
        state.variants.map(variant => {
            if (variant.selectedVariants.length > 0) {
                variantListPrice = <tr htmlFor="variant_price in product_variant_prices">
                    <td>
                        {
                            Object.keys(variant.selectedVariants).map(function (key) {
                                return variant.selectedVariants[key].variant
                            })
                        }/
                    </td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                </tr>
            }
        })
    }

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={ handleSubmit }>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="">Product Name</label>
                                    <input type="text" name="name" onChange={ handleInputChange } placeholder="Product Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Product SKU</label>
                                    <input type="text" onChange={ handleInputChange } name="sku" placeholder="Product Name" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Description</label>
                                    <textarea name="description" onChange={ handleInputChange } id="" cols="30" rows="4" className="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Media</h6>
                            </div>
                            <div className="card-body border">
                                {/* <vue-dropzone ref="myVueDropzone" id="dropzone"></vue-dropzone> */ }
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">File</label>
                                    <input type="file" onChange={ handleInputChange } className="form-control" name="image" id="image" placeholder="Select an image" aria-describedby="fileHelpId" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Variants</h6>
                            </div>
                            <div className="card-body">

                                { variantList }

                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Add another option</button>
                            </div>

                            <div className="card-header text-uppercase">Preview</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Variant</td>
                                                <td>Price</td>
                                                <td>Stock</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { variantListPrice }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >

                <button type="submit" className="btn btn-lg btn-primary mr-2" > Save</button >
                <button type="button" className="btn btn-secondary btn-lg">Cancel</button>
            </form >
        </div >
    )
}

export default Create


if (document.getElementById('create-product')) {
    ReactDOM.render(<Create />, document.getElementById('create-product'));
}
